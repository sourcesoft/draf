/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REGISTER,
} from './constants';

const initialState = fromJS({});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    default:
      return state;
  }
}

export default registerReducer;
