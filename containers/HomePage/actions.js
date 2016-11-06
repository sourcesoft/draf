/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_USERNAME,
  LOAD_GALLERY_GRID,
  LOAD_GALLERY_GRID_SUCCESS,
  LOAD_GALLERY_GRID_ERROR,
} from './constants';

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function loadGalleryGrid(cat) {
  return {
    type: LOAD_GALLERY_GRID,
    cat
  };
}

export function loadGalleryGridSuccess(list) {
  return {
    type: LOAD_GALLERY_GRID_SUCCESS,
    list
  };
}

export function loadGalleryGridError(error) {
  return {
    type: LOAD_GALLERY_GRID_ERROR,
    error
  };
}
