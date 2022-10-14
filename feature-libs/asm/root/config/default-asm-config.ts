/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICON_TYPE } from '@spartacus/storefront';

// TODO: Cannot import from components module. Need to refactor
import { AsmCustomerMapComponent, AsmCustomerOverviewComponent, AsmCustomerProductReviewsComponent } from 'feature-libs/asm/components/asm-customer-360/sections/components';
import { AsmCustomer360Type } from '../model/asm-360.model';

import { CustomerListColumnActionType } from '../model/customer-list.model';
import { AsmConfig } from './asm-config';

export const defaultAsmConfig: AsmConfig = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 600,
    },
    customerSearch: {
      maxResults: 20,
    },
    customerList: {
      pageSize: 5,
      showAvatar: true,
      columns: [
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.customer',
          renderer: (customer) => {
            return customer?.name ?? '';
          },
          actionType: CustomerListColumnActionType.START_SESSION,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.email',
          renderer: (customer) => {
            return customer?.uid ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.phone',
          renderer: (customer) => {
            return customer?.defaultAddress?.phone ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.order',
          icon: {
            symbol: ICON_TYPE.ORDER,
            captionLocalizationKey: 'asm.customerList.tableHeader.order',
          },
          actionType: CustomerListColumnActionType.ORDER_HISTORY,
        },
      ],
    },
    customer360: {
      tabs: [
        {
          i18nNameKey: 'asm.customer360.overviewTab',
          components: [
            {
              component: AsmCustomerOverviewComponent,
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.overviewTab',
          components: [
            {
              component: AsmCustomerProductReviewsComponent,
              requestData: {
                customer360Type: AsmCustomer360Type.REVIEW_LIST,
              },
              config: { pageSize: 5 },
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.mapsTab',
          components: [
            {
              component: AsmCustomerMapComponent,
              requestData: {
                customer360Type: AsmCustomer360Type.STORE_LOCATION,
              },
              config: {
                googleMapsApiKey: 'AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8',
                pageSize: 10,
              },
            },
          ],
        },
      ],
    },
  },
};
