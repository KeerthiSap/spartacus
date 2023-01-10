/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultSupportTicketRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      supportTickets: {
        paths: ['my-account/support-tickets'],
      },
      supportTicketDetails: {
        paths: ['my-account/support-ticket/:ticketCode'],
        paramsMapping: { ticketCode: 'ticketCode' },
      },
    },
  },
};