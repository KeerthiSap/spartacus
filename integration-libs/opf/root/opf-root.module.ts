/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  provideConfigValidator,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { defaultOpfRoutingConfig } from './config';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfidValidator } from './config/opf-config-validator';
import { OpfEventModule } from './events/opf-event.module';
import { OPF_CORE_FEATURE, OPF_FEATURE } from './feature-name';

export function defaultOpfComponentsConfig(): CmsConfig {
  return {
    featureModules: {
      [OPF_FEATURE]: {
        cmsComponents: [],
      },
      [OPF_CORE_FEATURE]: OPF_FEATURE,
    },
  };
}

@NgModule({
  imports: [
    OpfEventModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationResult',
        },
      },
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationCancel',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultOpfComponentsConfig),
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    // TODO OPF: uncomment once proper type and routing is set up
    provideDefaultConfig(defaultOpfRoutingConfig),
    provideConfigValidator(opfConfidValidator),
  ],
})
export class OpfRootModule {}
