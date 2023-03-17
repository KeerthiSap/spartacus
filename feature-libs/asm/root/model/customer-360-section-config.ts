/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export abstract class Customer360SectionConfig {
  googleMapsApiKey?: string;
  /** In meters. */
  storefinderRadius?: number;
  pageSize?: number;
}
