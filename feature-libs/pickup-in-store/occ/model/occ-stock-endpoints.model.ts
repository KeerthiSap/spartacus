/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get a stock level for a product.
     *
     * @member {string} [page]
     */
    stock?: string | OccEndpoint;

    /**
     * Get a stock level for a product at a specific store.
     *
     * @member {string} [page]
     */
    stockAtStore?: string | OccEndpoint;

    /**
     * Update the delivery option for a cart entry to pickup or delivery.
     * @member {string} [page]
     */
    updateDeliveryOption?: string | OccEndpoint;
  }
}
