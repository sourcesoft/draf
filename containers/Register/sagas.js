import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeLatest, delay } from 'redux-saga';
import { REGISTER } from 'containers/Register/constants';
// import { registerSuccess, registerError } from 'containers/Register/actions';
import { loadingShow, loadingHide, setLogged } from 'containers/App/actions';
import { API_DASHBOARD_NODE_CREATE } from 'utils/config';
import auth from 'utils/auth';

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

export function* registerWatcher() {
  yield* takeLatest(REGISTER, registerSaga);
}

// All sagas to be loaded
export default [
  registerWatcher,
];
