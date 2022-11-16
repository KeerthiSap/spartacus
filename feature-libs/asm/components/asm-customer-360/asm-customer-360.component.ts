/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsmConfig, getAsmDialogActionEvent } from '@spartacus/asm/core';
import {
  Asm360Facade,
  AsmCustomer360Data,
  AsmCustomer360Response,
  AsmCustomer360TabConfig,
  AsmDialogActionEvent,
  AsmDialogActionType,
} from '@spartacus/asm/root';
import { UrlCommand, User } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360',
  templateUrl: './asm-customer-360.component.html',
})
export class AsmCustomer360Component implements OnDestroy, OnInit {
  readonly closeIcon = ICON_TYPE.CLOSE;
  tabs: Array<AsmCustomer360TabConfig>;
  activeTab = 0;
  currentTab: AsmCustomer360TabConfig;

  customer: User;

  customer360Tabs$: Observable<Array<AsmCustomer360Data | undefined>>;

  protected subscription = new Subscription();

  constructor(
    protected asmConfig: AsmConfig,
    protected asm360Facade: Asm360Facade,
    protected injector: Injector,
    protected launchDialogService: LaunchDialogService
  ) {
    this.tabs = asmConfig.asm?.customer360?.tabs ?? [];
    this.currentTab = this.tabs[0];
  }

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        const customer: User = data.customer;

        this.customer = customer;
      })
    );

    this.setTabData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectTab(selectedTab: any): void {
    this.activeTab = selectedTab;
    this.currentTab = this.tabs[selectedTab];

    this.setTabData();
  }

  getAvatar(): string {
    const customer = this.customer ?? {};
    const { firstName = '', lastName = '' } = customer;

    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  /**
   * If there is a link within the modal, use this method to redirect the user and close the modal.
   */
  navigateTo(route: UrlCommand): void {
    let event: AsmDialogActionEvent;
    event = getAsmDialogActionEvent(
      this.customer,
      AsmDialogActionType.NAVIGATE,
      route
    );
    this.closeModal(event);
  }

  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  protected setTabData(): void {
    this.customer360Tabs$ = this.asm360Facade.get360Data(this.activeTab).pipe(
      filter((response) => Boolean(response)),
      map((response) => {
        return this.currentTab.components.map((component) => {
          const requestData = component.requestData;

          if (requestData) {
            return (response as AsmCustomer360Response).value.find(
              (data) => data.type === requestData.customer360Type
            );
          }
        });
      })
    );
  }
}
