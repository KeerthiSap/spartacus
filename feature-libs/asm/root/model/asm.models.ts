import { PaginationModel, SortModel, User } from '@spartacus/core';

export interface CustomerSearchPage {
  entries: User[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface CustomerSearchOptions {
  query?: string;
  pageSize?: number;
  customerListId?: string;
  currentPage?: number;
  sort?: string;
}

export interface AsmUi {
  collapsed?: boolean;
}

export interface Customer360Section {
  sectionTitle: CUSTOMER_360_SECTION_TITLE;
  sectionContent: string;
}

export enum CUSTOMER_360_SECTION_TITLE {
  OVERVIEW = 'OVERVIEW',
  PROFILE = 'PROFILE',
  ACTIVITY = 'ACTIVITY',
  FEEDBACK = 'FEEDBACK',
  PROMOTIONS = 'PROMOTIONS',
  MAPS = 'MAPS',
}
