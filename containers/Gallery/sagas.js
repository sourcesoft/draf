import { call, put, take, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_GALLERY_GRID } from 'containers/Gallery/constants';
import { loadGalleryGridSuccess, loadGalleryGridError } from 'containers/Gallery/actions';
import { loadingShow, loadingHide } from 'containers/App/actions';
import request from 'utils/request';
import { API_GALLERY } from 'utils/config';

export function* loadGalleryGrid(action) {
  // const username = yield select(selectUsername());
  yield put(loadingShow());
  const cat = action.cat === 0 ? 'list-latest' : `list/${action.cat}`;
  const requestURL = `${API_GALLERY}${cat}`;

  // Call our request helper (see 'utils/request')
  // console.log('about to call');
  const list = yield call(request, requestURL);
  // console.log('list', list);
  if (!list.err) {
    yield put(loadGalleryGridSuccess(list.data));
    yield put(loadingHide());
  } else {
    yield put(loadGalleryGridError(list.err));
  }
}

export function* loadGalleryGridWatcher() {
  yield* takeLatest(LOAD_GALLERY_GRID, loadGalleryGrid);
}

export function* observer() {
  const loadGalleryObserver = yield fork(loadGalleryGridWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(loadGalleryObserver);// cancel task instance
}

// All sagas to be loaded
export default [
  observer,
];
