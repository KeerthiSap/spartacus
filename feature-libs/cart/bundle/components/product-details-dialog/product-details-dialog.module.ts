import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  ModalModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductSummaryModule,
  ProductTabsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    UrlModule,
    IconModule,
    I18nModule,
    ModalModule,
    ProductSummaryModule,
    ProductIntroModule,
    ProductImagesModule,
    ProductTabsModule,
  ],
  declarations: [ProductDetailsDialogComponent],
  exports: [ProductDetailsDialogComponent],
})
export class ProductDetailsDialogModule {}