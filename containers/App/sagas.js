import { loadingHide, setLogged, setRole } from 'containers/App/actions';
import { call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { delay, takeLatest } from 'redux-saga';
import auth from 'utils/auth';
import { API_ROLE } from 'utils/config';

export function* location() {
  yield put(loadingHide());
  // Setting role and logged in global state each time
  // console.log('waiting a sec');
  yield delay(1000);
  // console.log('checking each time');
  const result = yield call(auth.isLogged);
  // console.log('logged in or not: ', result);
  if (result === 'no token') {
    yield put(setLogged(false));
  } else if (!result) {
    // console.log('not logged in lets change state to notify all comps');
    yield put(setLogged(false));
    yield put(push('/logout'));
  } else {
    yield put(setLogged(true));
    const role = yield call(auth.userRequest, API_ROLE);
    // console.log('user role: ', role);
    yield put(setRole(role.data.role)); // set global.role
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield* takeLatest(LOCATION_CHANGE, location);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
