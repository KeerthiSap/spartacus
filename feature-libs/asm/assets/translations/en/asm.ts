/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const asm = {
  asm: {
    mainLogoLabel: 'SAP',
    mainTitle: 'Assisted Service Mode',
    logout: 'Sign Out',
    hideUi: 'Close ASM',
    customers: 'Customers',
    toggleUi: {
      collapse: 'Hide ASM',
      expand: 'Show ASM',
    },
    loginForm: {
      submit: 'Sign In',
      userId: {
        label: 'Agent ID',
        required: 'Agent ID is required',
      },
      password: {
        label: 'Password',
        required: 'Password is required',
      },
    },
    customerSearch: {
      searchTerm: {
        label: 'Customer Name/Email Address',
      },
      submit: 'Start Session',
      noMatch: 'No customer found.',
    },
    customerList: {
      title: 'Customer List',
      description: 'Select a customer from one of several provided lists.',
      tableHeader: {
        customer: 'Customer',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        cart: 'Cart',
        order: 'Order',
      },
      tableSort: {
        sortBy: 'Sort by',
        byNameAsc: 'Name (Asc)',
        byNameDesc: 'Name (Desc)',
        byDateAsc: 'Date (Asc)',
        byDateDesc: 'Date (Desc)',
        byOrderDateAsc: 'Order date (Asc)',
        byOrderDateDesc: 'Order date (Desc)',
      },
      page: {
        page: 'Page {{count}}',
        previous: 'Previous',
        next: 'Next',
      },
      noOfCustomers: '{{count}} Customers',
      noCustomers: 'There are currently no customers in this customer list.',
      noLists:
        'There are currently no customer lists available. Contact your system administrator.',
      listsError:
        'The customer lists could not be retrieved. Please try again later.',
    },
    bindCart: {
      cartNumber: 'Cart Number',
      bindCartToCustomer: 'Assign Cart to Customer',
      success: 'Cart has been successfully assigned',
      assignCartId: 'Assign a cart id to customer',
      enterCartId: 'Enter cart id',
      resetCartId: 'Reset',
      dialog: {
        title: 'Assign Anonymous Cart',
        body: 'Do you want to replace the current active cart with the anonymous cart? If you replace the current active cart, it is saved as a saved cart.',
        actions: {
          replace: 'Replace Cart',
        },
      },
    },
    profileAddresses: {
      billingAddress: 'Billing Address',
      deliveryAddress: 'Delivery Address',
      phone1: 'Phone1',
      phone2: 'Phone2',
      paymentMethodHeader: 'Saved Payment Methods',
    },
    customer360: {
      title: 'Customer Profile',
      subTitle: '{{name}} Customer 360\xB0 View',
      overview: 'Overview',
      profile: 'Profile',
      activity: 'Activity',
      feedback: 'Feedback',
      promotions: 'Promotions',
      maps: 'Maps',
    },
    customerOverview: {
      activeCart: 'Active Cart',
      activeCartCode: 'Active Cart {{code}}',
      totalNoItems: 'Total No. Items {{count}}',
      totalPrice: 'Total Price {{price}}',
      noActiveCart: 'There are currently no Active Cart Items',
      savedCartCode: 'Last Saved Cart {{code}}',
      savedCart: 'Last Saved Cart',
      noSavedCart: 'There are currently no Saved Cart items',
      interests: 'Interests',
      noInterests: 'There are currently no Interest items',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      quantity: 'Qty: {{count}}',
      itemPrice: 'Item Price: {{price}}',
      showMore: 'Show More',
      showLess: 'Show Less'
    },
    csagentTokenExpired: 'Your customer support agent session is expired.',
    endSession: 'End Session',
    agentSessionTimer: {
      label: 'Session Timeout',
      minutes: 'min',
      reset: 'Reset',
    },
    auth: {
      agentLoggedInError:
        'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.',
    },
    error: {
      noCustomerId:
        'No customerId found for selected user. Session cannot be started.',
    },
  },
};
