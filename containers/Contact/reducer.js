/*
 *
 * Contact reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CONTACT,
  CONTACT_SUCCESS,
  CONTACT_ERROR,
} from './constants';

const initialState = fromJS({success: false});

function contactReducer(state = initialState, action) {
  switch (action.type) {
    case CONTACT_ERROR:
      return state.set('error', action.values);
    case CONTACT_SUCCESS:
      return state.set('success', action.values);
    default:
      return state;
  }
}

export default contactReducer;
