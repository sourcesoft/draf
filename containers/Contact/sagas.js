import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { CONTACT } from 'containers/Contact/constants';
import { contactSuccess, contactError } from 'containers/Contact/actions';
import { loadingShow, loadingHide } from 'containers/App/actions';
import request from 'utils/request';
import { API_CONTACT } from 'utils/config';

export function* contactSaga(action) {
  yield put(loadingShow());
  // Set default if empty
  const values = action.values === 0 ? { from: '', body: '' } : action.values;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      from: values.from,
      subject: 'Third Eye Render Contact Form',
      body: values.body,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
  // Call our request helper (see 'utils/request')
  const result = yield call(request, API_CONTACT, options);
  // console.log(result);
  if (!result.err) {
    yield put(contactSuccess(true)); // good
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(contactError(0)); // weird err
  }
}

export function* contactWatcher() {
  yield* takeLatest(CONTACT, contactSaga);
}

// All sagas to be loaded
export default [
  contactWatcher,
];
