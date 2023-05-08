/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  OCC_CART_ID_CURRENT,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  EMPTY,
  iif,
  Observable,
  Subscription,
} from 'rxjs';
import {
  concatMap,
  filter,
  finalize,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { SAVE_CART_DIALOG_ACTION } from '../asm-save-cart-dialog/asm-save-cart-dialog.component';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-asm-bind-cart',
  templateUrl: './asm-bind-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmBindCartComponent implements OnInit, OnDestroy {
  activeCartValidator: ValidatorFn = (control) => {
    if (control.value === this.activeCartId) {
      return { activeCartError: true };
    }
    return null;
  };

  cartId: FormControl<string | null> = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    this.activeCartValidator,
  ]);

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  valid$ = this.cartId.statusChanges.pipe(
    map((status) => status === 'VALID'),
    shareReplay(1)
  );

  activeCartId = '';
  inactiveCartId = '';
  savedInactiveCart = false;

  @ViewChild('bindToCart') bindToCartElemRef: ElementRef<HTMLButtonElement>;
  @ViewChild('saveInactiveCart')
  saveInactiveCartElemRef: ElementRef<HTMLButtonElement>;

  protected subscription = new Subscription();

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected asmBindCartFacade: AsmBindCartFacade,
    protected launchDialogService: LaunchDialogService,
    protected savedCartFacade: SavedCartFacade,
    protected asmComponentService: AsmComponentService,
    protected routing: RoutingService,
    @Optional() protected featureConfig?: FeatureConfigService
  ) {}

  ngOnInit(): void {
    this.subscribeForDeeplinkInactiveCart();

    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((response) => {
        this.activeCartId = response ?? '';

        this.cartId.setValue(
          this.inactiveCartId.length > 0
            ? this.inactiveCartId
            : this.activeCartId
        );
      })
    );
  }

  resetInput() {
    if (!this.cartId.value) {
      this.cartId.setValue(this.activeCartId);
    }
  }

  /**
   * Bind the input cart number to the customer
   */
  bindCartToCustomer() {
    const anonymousCartId = this.cartId.value;

    const subscription = combineLatest([
      this.loading$.asObservable(),
      this.valid$,
    ])
      .pipe(
        take(1),
        filter(([loading, valid]) => !loading && valid),
        tap(() => this.loading$.next(true)),
        concatMap(() =>
          this.activeCartFacade.getActive().pipe(
            map((cart) => cart.deliveryItemsQuantity ?? 0),
            take(1)
          )
        ),
        concatMap((cartItemCount) =>
          iif(
            () => Boolean(this.activeCartId && cartItemCount),
            this.openDialog(this.activeCartId, anonymousCartId as string),
            this.simpleBindCart(anonymousCartId as string)
          )
        ),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            { key: 'asm.bindCart.success' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        error: (error: HttpErrorModel) => {
          this.globalMessageService.add(
            error.details?.[0].message ?? '',
            GlobalMessageType.MSG_TYPE_ERROR
          );
        },
      });

    this.subscription.add(subscription);
  }

  onSaveInactiveCart() {
    this.asmComponentService.setShowInactiveCartInfoAlert(false);
    const customerId =
      this.asmComponentService.getSearchParameter('customerId');
    this.multiCartFacade.loadCart({
      cartId: this.inactiveCartId,
      userId: customerId,
    });
    this.multiCartFacade
      .getCartEntity(this.inactiveCartId)
      .pipe(
        filter((state) => state.success === true),
        take(1),
        map((state) => state.value as Cart),
        concatMap((cart) =>
          iif(() => Boolean(cart !== null), this.openASMSaveCartDialog(cart))
        )
      )
      .subscribe();

    this.savedCartFacade
      .getSaveCartProcessSuccess()
      .pipe(
        filter((success) => success),
        take(1)
      )
      .subscribe(() => {
        this.goToSavedCartDetails(this.inactiveCartId);
        this.savedInactiveCart = true;
      });

    this.savedCartFacade
      .getSaveCartProcessError()
      .pipe(
        filter((error) => error),
        take(1)
      )
      .subscribe(() => {
        this.savedInactiveCart = true;
      });
  }

  clearText() {
    this.cartId.setValue('');
    this.clearInactiveCart();
  }

  protected clearInactiveCart(): void {
    if (this.featureConfig?.isLevel('6.2')) {
      this.inactiveCartId = '';
      this.savedInactiveCart = false;
      this.asmComponentService.setShowInactiveCartInfoAlert(false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Binds cart on subscription and reloads cart
   */
  protected simpleBindCart(anonymousCartId: string): Observable<unknown> {
    return defer(() => this.asmBindCartFacade.bindCart(anonymousCartId)).pipe(
      tap(() => this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT))
    );
  }

  /**
   * Opens dialog and passes non-cancel result to select action
   */
  protected openDialog(activeCartId: string, anonymousCartId: string) {
    return defer(() => {
      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.ASM_BIND_CART,
        this.bindToCartElemRef
      );
      return this.launchDialogService.dialogClose.pipe(
        filter((result) => Boolean(result)),
        take(1)
      ) as Observable<BIND_CART_DIALOG_ACTION>;
    }).pipe(
      filter((dialogResult) => Boolean(dialogResult)),
      concatMap((dialogResult) => {
        return this.selectBindAction(
          activeCartId,
          anonymousCartId,
          dialogResult
        );
      })
    );
  }

  protected selectBindAction(
    activeCartId: string,
    anonymousCartId: string,
    action: BIND_CART_DIALOG_ACTION
  ): Observable<unknown> {
    switch (action) {
      case BIND_CART_DIALOG_ACTION.REPLACE:
        return this.replaceCart(activeCartId, anonymousCartId);

      case BIND_CART_DIALOG_ACTION.CANCEL:
      default:
        return EMPTY;
    }
  }

  protected selectSaveAction(
    inactiveCartId: string,
    action: SAVE_CART_DIALOG_ACTION
  ): Observable<unknown> {
    switch (action) {
      case SAVE_CART_DIALOG_ACTION.SAVE:
        return this.saveCart(inactiveCartId);

      case SAVE_CART_DIALOG_ACTION.CANCEL:
      default:
        return EMPTY;
    }
  }

  protected replaceCart(
    previousActiveCartId: string,
    anonymousCartId: string
  ): Observable<unknown> {
    return this.simpleBindCart(anonymousCartId).pipe(
      tap(() => {
        this.savedCartFacade.saveCart({
          cartId: previousActiveCartId,
          saveCartName: previousActiveCartId,
          // TODO(#12660): Remove default value once backend is updated
          saveCartDescription: '-',
        });
      })
    );
  }

  protected subscribeForDeeplinkInactiveCart(): void {
    if (this.featureConfig?.isLevel('6.2')) {
      this.subscription.add(
        this.asmComponentService
          .isEmulatedByDeepLink()
          .pipe(filter((emulated) => emulated && this.isDeepLinkInactiveCart()))
          .subscribe(() => {
            this.savedInactiveCart = false;
            this.inactiveCartId =
              this.asmComponentService.getSearchParameter('cartId');
            this.cartId.setValue(this.inactiveCartId);
            this.asmComponentService.setShowInactiveCartInfoAlert(true);
          })
      );
    }
  }

  protected isDeepLinkInactiveCart(): boolean {
    const cartId = this.asmComponentService.getSearchParameter('cartId');
    const cartType = this.asmComponentService.getSearchParameter('cartType');
    if (cartType === 'inactive' && !this.isEmptyStr(cartId)) {
      return true;
    }
    return false;
  }

  protected isEmptyStr(string?: string): boolean {
    return string?.trim() === '' || string == null;
  }

  protected openASMSaveCartDialog(inactiveCart: Cart) {
    return defer(() => {
      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.ASM_SAVE_CART,
        this.saveInactiveCartElemRef,
        inactiveCart
      );
      return this.launchDialogService.dialogClose.pipe(
        filter((result) => Boolean(result)),
        take(1)
      ) as Observable<SAVE_CART_DIALOG_ACTION>;
    }).pipe(
      filter((dialogResult) => Boolean(dialogResult)),
      concatMap((dialogResult) => {
        return this.selectSaveAction(inactiveCart.code as string, dialogResult);
      })
    );
  }

  protected saveCart(inactiveCartId: string): Observable<unknown> {
    return defer(() => {
      this.savedCartFacade.saveCart({
        cartId: inactiveCartId,
        saveCartName: inactiveCartId,
        saveCartDescription: '-',
      });
    });
  }

  protected goToSavedCartDetails(cartId: string): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cartId },
    });
  }
}
