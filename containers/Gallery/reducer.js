/*
 *
 * Gallery reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_GALLERY_GRID,
  LOAD_GALLERY_GRID_SUCCESS,
  LOAD_GALLERY_GRID_ERROR,
} from './constants';

const initialState = fromJS({
  cat: 0
});

function galleryReducer(state = initialState, action) {
  switch (action.type) {
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

export default galleryReducer;
