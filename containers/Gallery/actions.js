/*
 *
 * Gallery actions
 *
 */

import {
  LOAD_GALLERY_GRID,
  LOAD_GALLERY_GRID_SUCCESS,
  LOAD_GALLERY_GRID_ERROR,
} from './constants';

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
