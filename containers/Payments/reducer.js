/*
 *
 * Payments reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PAYMENTS_SUCCESS,
} from './constants';

const initialState = fromJS({ payments: [] });

function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PAYMENTS_SUCCESS:
      return state.set('payments', action.list);
    default:
      return state;
  }
}

export default paymentsReducer;
