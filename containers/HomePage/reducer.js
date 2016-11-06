/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  CHANGE_USERNAME,
  LOAD_GALLERY_GRID,
  LOAD_GALLERY_GRID_SUCCESS,
  LOAD_GALLERY_GRID_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  username: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state
        .set('username', action.name.replace(/@/gi, ''));
    case LOAD_GALLERY_GRID:
      return state.set('cat', action.cat);
    case LOAD_GALLERY_GRID_SUCCESS:
      return state.set('list', action.list);
    case LOAD_GALLERY_GRID_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default homeReducer;
