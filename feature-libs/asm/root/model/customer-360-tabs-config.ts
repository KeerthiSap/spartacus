/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmCustomer360TabConfig } from './customer-360-tab-config';

export abstract class AsmCustomer360TabsConfig {
  tabs?: Array<AsmCustomer360TabConfig>;
}
