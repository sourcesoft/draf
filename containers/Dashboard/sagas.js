import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { LOAD_NODE, LOAD_NODE_LIST } from 'containers/Dashboard/constants';
import { loadNodeSuccess, loadNodeError, loadNodeListSuccess,
          setActive }
         from 'containers/Dashboard/actions';
import { loadingShow, loadingHide } from 'containers/App/actions';
import auth from 'utils/auth';
import { API_DASHBOARD_NODE, API_DASHBOARD_NODE_LIST } from 'utils/config';

export function* loadNodeSaga() {
  yield put(loadingShow());
  const list = yield call(auth.userRequest, API_DASHBOARD_NODE);

  // console.log('list', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(loadNodeError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadNodeSuccess(list.data[0])); // Saves in dashboard.nid
  }
}

export function* loadNodeListSaga() {
  yield put(loadingShow());
  const list = yield call(auth.userRequest, API_DASHBOARD_NODE_LIST);

  // console.log('list', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(loadNodeError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    // yield put(loadNodeSuccess(list.data[0])); // Saves in dashboard.nid
    yield put(loadNodeListSuccess(list.data)); // Saves in dashboard.nodes
  }
}

export function* dashboardResetSaga(action) {
  // each time admin clicks dashboard menu select list shows up
  if (action.payload.pathname === '/dashboard') {
    yield put(setActive(false));
  }
}

export function* loadNodeWatcher() {
  yield* takeLatest(LOAD_NODE, loadNodeSaga);
}
export function* loadNodeListWatcher() {
  yield* takeLatest(LOAD_NODE_LIST, loadNodeListSaga);
}
export function* dashboardResetWatcher() {
  yield* takeLatest(LOCATION_CHANGE, dashboardResetSaga);
}
export function* observer() {
  const loadNode = yield fork(loadNodeWatcher);
  const loadNodeList = yield fork(loadNodeListWatcher);
  const dashboardReset = yield fork(dashboardResetWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(loadNode);// cancel task instance
  yield cancel(loadNodeList);// cancel task instance
  yield cancel(dashboardReset);// cancel task instance
}

// All sagas to be loaded
export default [
  observer,
];
