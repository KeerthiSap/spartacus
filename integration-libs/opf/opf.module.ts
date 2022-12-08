/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfComponentsModule } from '@spartacus/opf/components';
import { OpfCoreModule } from '@spartacus/opf/core';

@NgModule({
  imports: [OpfComponentsModule, OpfCoreModule],
})
export class OpfModule {}