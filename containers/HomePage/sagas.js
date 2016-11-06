import { call, put, take, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, delay } from 'redux-saga';
import { REGISTER } from 'containers/Register/constants';
import { loadingShow, loadingHide, setLogged } from 'containers/App/actions';

import request from 'utils/request';
import { API_DASHBOARD_NODE_CREATE, API_GALLERY } from 'utils/config';
import auth from 'utils/auth';

import { LOAD_GALLERY_GRID } from 'containers/HomePage/constants';
import { loadGalleryGridSuccess, loadGalleryGridError } from 'containers/HomePage/actions';

export function* registerSaga(action) {
  yield put(loadingShow());
  // Set default if empty
  const values = action.values === 0 ? { email: '', password: '', name: '' } : action.values;

  // Call our request helper (see 'utils/request')
  const resultRegister = yield call(auth.register, values.email, values.password);
  // console.log(resultRegister);
  if (resultRegister) {
    // trying to login
    const resultLogin = yield call(auth.login, values.email, values.password);
    // console.log(resultLogin);
    if (resultLogin === 1) {
      yield put(setLogged(true)); // good
      // tring to create node with new user
      yield delay(100);
      const options = {
        type: [
          {
            target_id: 'message',
          },
        ],
        title: [
          {
            value: values.name,
          },
        ],
        body: [
          {
            value: values.name,
          },
        ],
      };
      const resultNode = yield call(auth.userRequest, API_DASHBOARD_NODE_CREATE, options);
      // console.log('resultNode', resultNode);
      if (resultNode) {
        delay(100);
        yield put(push('/dashboard'));
        yield put(loadingHide());
      } else {
        // console.log('couldn create node');
      }
    } else if (resultLogin === 2) {
      // console.log('user pass wrong when login, should never happen here!');
    }
  } else {
    // error register
    // console.log('already taken user');
    yield put(loadingHide());
  }
}

export function* loadGalleryGrid(action) {
  const size = action.cat;
  // Only if it's called from home page
  if (size === -1 || size === -2) {
    const address = (size === -1) ? 'list-desktop' : 'list-mobile';
    const requestURL = `${API_GALLERY}${address}`;

    // Call our request helper (see 'utils/request')
    const list = yield call(request, requestURL);

    if (!list.err) {
      yield put(loadGalleryGridSuccess(list.data));
    } else {
      yield put(loadGalleryGridError(list.err));
    }
  }
}

export function* loadGalleryGridWatcher() {
  yield* takeLatest(LOAD_GALLERY_GRID, loadGalleryGrid);
}

export function* registerWatcher() {
  yield* takeLatest(REGISTER, registerSaga);
}

export function* observer() {
  const loadGalleryObserver = yield fork(loadGalleryGridWatcher);
  const registerObserver = yield fork(registerWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(loadGalleryObserver);// cancel task instance
  yield cancel(registerObserver);// cancel task instance
}

// All sagas to be loaded
export default [
  observer,
];
