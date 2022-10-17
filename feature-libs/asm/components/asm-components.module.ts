/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
  PopoverModule,
  SortingModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { AsmBindCartDialogComponent } from './asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { AsmBindCartComponent } from './asm-bind-cart/asm-bind-cart.component';
import {
  AsmCustomerMapComponent,
  AsmCustomerOverviewComponent,
  AsmCustomerProductReviewsComponent,
  AsmCustomerProfileComponent,
} from './asm-customer-360';
import { AsmCustomer360ComponentModule } from './asm-customer-360/asm-customer-360.component.module';
import { defaultCustomer360LayoutConfig } from './asm-customer-360/default-customer-360-layout.config';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { AsmToggleUiComponent } from './asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { defaultCustomerListLayoutConfig } from './customer-list/default-customer-list-layout.config';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
import { defaultAsmLayoutConfig } from './default-asm-layout.config';
import { defaultBindCartLayoutConfig } from './default-bind-cart-layout.config';
import { DotSpinnerComponent } from './dot-spinner/dot-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    IconModule,
    PopoverModule,
    NgSelectModule,
    FormsModule,
    SpinnerModule,
    PasswordVisibilityToggleModule,
    KeyboardFocusModule,
    NgSelectA11yModule,
    SortingModule,
    FeaturesConfigModule,
    CardModule,
    MediaModule,
    RouterModule,
    UrlModule,
    AsmCustomer360ComponentModule,
  ],
  declarations: [
    AsmBindCartDialogComponent,
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerListComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
    AsmBindCartComponent,
    DotSpinnerComponent,
  ],
  exports: [
    AsmBindCartDialogComponent,
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerListComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
    AsmBindCartComponent,
    AsmCustomer360ComponentModule,
    DotSpinnerComponent,
  ],
  providers: [
    provideDefaultConfig(defaultAsmLayoutConfig),
    provideDefaultConfig(defaultBindCartLayoutConfig),
    provideDefaultConfig(defaultCustomerListLayoutConfig),
    provideDefaultConfig(defaultCustomer360LayoutConfig),
    provideDefaultConfig({
      cmsComponents: {
        AsmCustomer360OverviewComponent: {
          component: AsmCustomerOverviewComponent,
        },
        AsmCustomer360ProfileComponent: {
          component: AsmCustomerProfileComponent,
        },
        AsmCustomer360ProductReviewsComponent: {
          component: AsmCustomerProductReviewsComponent,
        },
        AsmCustomer360MapComponent: {
          component: AsmCustomerMapComponent,
        },
      },
    }),
  ],
})
export class AsmComponentsModule {}
