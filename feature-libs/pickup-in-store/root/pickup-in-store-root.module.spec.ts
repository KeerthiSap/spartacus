import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { CmsConfig } from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';

import { STORE_FINDER_FEATURE } from '@spartacus/storefinder/root';
import { USER_PROFILE_FEATURE } from '@spartacus/user/profile/root';
import {
  PICKUP_IN_STORE_CORE_FEATURE,
  PICKUP_IN_STORE_FEATURE,
} from './feature-name';
import {
  defaultPickupInStoreComponentsConfig,
  PickupInStoreRootModule,
} from './pickup-in-store-root.module';

const MockCmsConfig: CmsConfig = {
  featureModules: {
    [PICKUP_IN_STORE_FEATURE]: {
      cmsComponents: [
        'CheckoutReviewPickup',
        'MyPreferredStoreComponent',
        'OrderConfirmationPickUpComponent',
        'PickupInStoreDeliveryModeComponent',
      ],
      dependencies: [
        STORE_FINDER_FEATURE,
        CART_BASE_FEATURE,
        ORDER_FEATURE,
        USER_PROFILE_FEATURE,
      ],
    },
    [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
  },
};

describe('PickupInStoreRootModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        PickupInStoreRootModule,
      ],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(PickupInStoreRootModule);
    expect(module).toBeDefined();
  });

  it('has CmsConfig for components and the core feature', () => {
    const result = defaultPickupInStoreComponentsConfig();
    expect(result).toEqual(MockCmsConfig);
  });
});
