/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  @Input()
  productCode: string;
  @Input()
  entryNumber: number;
  @Input()
  quantity: number;

  @Output()
  storeSelected: EventEmitter<null> = new EventEmitter<null>();

  stores$: Observable<PointOfServiceStock[]>;
  hasSearchStarted$: Observable<boolean>;
  isSearchRunning$: Observable<boolean>;

  constructor(
    private readonly pickupLocationsSearchService: PickupLocationsSearchFacade,
    private readonly preferredStoreService: PreferredStoreService,
    private readonly intendedPickupLocationService: IntendedPickupLocationFacade
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.stores$ = this.pickupLocationsSearchService.getSearchResults(
      this.productCode
    );
    this.hasSearchStarted$ = this.pickupLocationsSearchService.hasSearchStarted(
      this.productCode
    );
    this.isSearchRunning$ = this.pickupLocationsSearchService.isSearchRunning();
  }

  onSelectStore(store: PointOfServiceStock) {
    const { stockInfo: _, ...pointOfService } = store;
    const { name = '', displayName = '' } = pointOfService;

    this.preferredStoreService.setPreferredStore({ name, displayName });

    this.intendedPickupLocationService.setIntendedLocation(this.productCode, {
      ...pointOfService,
      pickupOption: 'pickup',
    });

    this.storeSelected.emit();
  }
}