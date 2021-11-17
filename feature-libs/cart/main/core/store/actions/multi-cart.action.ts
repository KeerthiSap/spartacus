import { Action } from '@ngrx/store';
import { Cart, CartType } from '@spartacus/cart/main/root';
import { StateUtils } from '@spartacus/core';
import { getCartIdByUserId } from '../../utils/utils';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const SET_TEMP_CART = '[Cart] Set Temp Cart';

export const CART_PROCESSES_INCREMENT = '[Cart] Cart Processes Increment';
export const CART_PROCESSES_DECREMENT = '[Cart] Cart Processes Decrement';

export const SET_ACTIVE_CART_ID = '[Cart] Set Active Cart Id';

export const CLEAR_CART_STATE = '[Cart] Clear Cart State';

export const SET_CART_TYPE_INDEX = '[Cart] Set cart type index';
export const SET_CART_DATA = '[Cart] Set cart data';

/**
 * To keep track of cart creation process we use cart with `temp-${uuid}` id.
 * After creating cart we switch to entity with `code` or `guid`.
 * We need `temp-${uuid}` cart entities for loading/error state.
 */
export class SetTempCart extends StateUtils.EntitySuccessAction {
  readonly type = SET_TEMP_CART;
  constructor(public payload: { cart: Cart; tempCartId: string }) {
    super(MULTI_CART_DATA, payload.tempCartId, payload.cart);
  }
}

// TODO(#7241): Remove when there won't be any usage
/**
 * Increases process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesIncrementAction instead of dispatching this action.
 * @deprecated since 2.0
 */
export class CartProcessesIncrement extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_PROCESSES_INCREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

// TODO(#7241): Remove when there won't be any usage
/**
 * Decrement process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesDecrementAction instead of dispatching this action.
 * @deprecated since 2.0
 */
export class CartProcessesDecrement extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_PROCESSES_DECREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_DATA, payload);
  }
}

/**
 * Only sets active cart property with id of active cart. Then services take care of loading that cart.
 */
export class SetActiveCartId implements Action {
  readonly type = SET_ACTIVE_CART_ID;
  constructor(public payload: string) {}
}

/**
 * Clear whole cart store state: all entities + reset rest of the cart state.
 */
export class ClearCartState extends StateUtils.EntityRemoveAllAction {
  readonly type = CLEAR_CART_STATE;
  constructor() {
    super(MULTI_CART_DATA);
  }
}

export class SetCartTypeIndex implements Action {
  readonly type = SET_CART_TYPE_INDEX;
  constructor(public payload: { cartType: CartType; cartId: string }) {}
}

export class SetCartData extends StateUtils.EntitySuccessAction {
  readonly type = SET_CART_DATA;
  constructor(public payload: { cart: Cart; userId: string }) {
    super(MULTI_CART_DATA, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export type MultiCartActions =
  | SetTempCart
  | CartProcessesIncrement
  | CartProcessesDecrement
  | SetActiveCartId
  | ClearCartState
  | SetCartTypeIndex
  | SetCartData;
