/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CURRENT_UNIT_SERVICE,
  UNIT_COST_CENTER_LIST_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const UNIT_COST_CENTERS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs\organization\administration\components\unit\links\cost-centers\unit-cost-centers.component.ts
  class: UNIT_COST_CENTER_LIST_COMPONENT,
  importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  deprecatedParams: [],
  addParams: [
    {
      className: CURRENT_UNIT_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE,
    },
  ],
};
