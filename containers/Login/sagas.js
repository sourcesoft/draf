import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { LOGIN } from 'containers/Login/constants';
import { loginSuccess, loginError } from 'containers/Login/actions';
import { loadingShow, loadingHide, setLogged } from 'containers/App/actions';
import auth from 'utils/auth';

export function* login(action) {
  yield put(loadingShow());
  // Set default if empty
  const values = action.values === 0 ? { email: '', password: '' } : action.values;

  // Call our request helper (see 'utils/request')
  const result = yield call(auth.login, values.email, values.password);
  // console.log(result);
  if (result === 1) {
    yield put(setLogged(true)); // set global.logged

    yield put(loginSuccess()); // good
    yield put(loadingHide());
    // TODO redirect
    yield put(push('/dashboard'));
  } else if (result === 2) {
    yield put(loadingHide());
    yield put(loginError(2)); // bad username password
  } else {
    yield put(loadingHide());
    yield put(loginError(0)); // weird err
  }
}

export function* loginWatcher() {
  yield* takeLatest(LOGIN, login);
}

// All sagas to be loaded
export default [
  loginWatcher,
];
