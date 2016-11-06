import { call, put, select, take, fork, cancel } from 'redux-saga/effects';
import { takeLatest, delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_NODE_SUCCESS } from 'containers/Dashboard/constants';
import { LOAD_PAYMENTS, SEND_PAYMENTS } from 'containers/Payments/constants';
import { loadPayments, loadPaymentsSuccess, loadPaymentsError,
          sendPaymentsSuccess, sendPaymentsError } from 'containers/Payments/actions';
import auth from 'utils/auth';
import { API_DASHBOARD_PAYMENTS, API_DASHBOARD_MESSAGES_NEW } from 'utils/config';
import { loadingShow, loadingHide } from 'containers/App/actions';
import { selectNid } from 'containers/Dashboard/selectors';
import { selectRole } from 'containers/App/selectors';

export function* loadPaymentsSaga() {
  yield put(loadingShow());
  // Now we have it in store
  let node = yield select(selectNid());
  if (!node) {
    // We don't have it in global state this means Dashboard saga hasn't ran yet
    // First another saga should finish loading
    yield take(LOAD_NODE_SUCCESS);
    // That saga set our global nid state for us
    yield delay(30);
    // Now we get our nid again
    node = yield select(selectNid());
  }
  // Using nid to fetch comments of that node (messages)
  const list = yield call(auth.userRequest, `${API_DASHBOARD_PAYMENTS}/${node.nid}`);

  // console.log('running saga load chat', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(loadPaymentsError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadPaymentsSuccess(list.data));
  }
}


/*
 * TODO: fix subject `Me` to `third eye render` when admin is logged in
 */
export function* sendPaymentsSaga(action) {
  yield put(loadingShow());
  // console.log('action.msg', action.msg);
  // console.log('send saga called once here');

  const node = yield select(selectNid());
  const role = yield select(selectRole());
  const data = {
    entity_id: [
      {
        target_id: node.nid,
      },
    ],
    entity_type: [
      {
        value: 'node',
      },
    ],
    subject: [
      {
        value: (role === 0) ? node.title : 'Third Eye Render',
      },
    ],
    comment_type: [
      {
        target_id: 'comment_content',
      },
    ],
    field_name: [
      {
        value: 'field_comment',
      },
    ],
    comment_body: [
      {
        value: action.msg,
        format: 'basic_html',
      },
    ],
    field_comment_type: [
      {
        target_id: 5, // Media term in taxonomy
      },
    ],
  };
  const list = yield call(auth.userRequest, API_DASHBOARD_MESSAGES_NEW, data);

  // console.log('list', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(sendPaymentsError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadPayments());
    yield put(sendPaymentsSuccess());
  }
}

export function* loadPaymentsWatcher() {
  yield* takeLatest(LOAD_PAYMENTS, loadPaymentsSaga);
}

export function* sendPaymentsWatcher() {
  // yield takeLatest(SEND_TALK, sendTalkSaga);
  let action;
  while (action = yield take(SEND_PAYMENTS)) {
    yield call(sendPaymentsSaga, action);
  }
}

export function* sendPaymentsObserver() {
  // yield takeLatest(SEND_TALK, sendTalkSaga);
  const chatWatcher = yield fork(loadPaymentsWatcher);
  const talkWatcher = yield fork(sendPaymentsWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(talkWatcher);// cancel task instance
  yield cancel(chatWatcher);// cancel task instance
}

// All sagas to be loaded
export default [
  sendPaymentsObserver,
];
