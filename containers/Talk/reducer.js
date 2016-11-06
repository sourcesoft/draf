/*
 *
 * Talk reducer
 *
 */

import { fromJS } from 'immutable';
import {
  // LOAD_CHAT,
  LOAD_CHAT_SUCCESS,
  // LOAD_CHAT_ERROR,
} from './constants';

const initialState = fromJS({ chat: [] });

function talkReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHAT_SUCCESS:
      return state.set('chat', action.list);
    default:
      return state;
  }
}

export default talkReducer;
