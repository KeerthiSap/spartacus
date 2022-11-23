import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  ProductFutureStock,
  ProductFutureStockList,
} from '../model/future-stock.model';

export const FUTURE_STOCK_NORMALIZER = new InjectionToken<
  Converter<any, ProductFutureStock>
>('FutureStockNormalizer');

export const FUTURE_STOCK_LIST_NORMALIZER = new InjectionToken<
  Converter<any, ProductFutureStockList>
>('FutureStockListNormalizer');