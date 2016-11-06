/*
 *
 * Media reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MEDIA_SUCCESS,
} from './constants';

const initialState = fromJS({ media: [] });

function mediaReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MEDIA_SUCCESS:
      return state.set('media', action.list);
    default:
      return state;
  }
}

export default mediaReducer;
