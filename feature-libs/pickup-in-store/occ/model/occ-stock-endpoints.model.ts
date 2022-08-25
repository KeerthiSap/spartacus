/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
     * Patch Delivery Option for a entryId in Cart.
     * @member {string} [page]
     */
    patchDeliveryOption?: string | OccEndpoint;
  }
}