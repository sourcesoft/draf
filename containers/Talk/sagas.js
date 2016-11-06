import { call, put, select, take, fork, cancel } from 'redux-saga/effects';
import { takeLatest, delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_NODE_SUCCESS } from 'containers/Dashboard/constants';
import { LOAD_CHAT, SEND_TALK } from 'containers/Talk/constants';
import { loadChat, loadChatSuccess, loadChatError,
          sendTalkSuccess, sendTalkError } from 'containers/Talk/actions';
import auth from 'utils/auth';
import { API_DASHBOARD_MESSAGES, API_DASHBOARD_MESSAGES_NEW } from 'utils/config';
import { loadingShow, loadingHide } from 'containers/App/actions';
import { selectNid } from 'containers/Dashboard/selectors';
import { selectRole } from 'containers/App/selectors';
import selectTalk from './selectors';

export function* loadChatSaga() {
  // Now we have it in store
  let node = yield select(selectNid());
  const { chat } = yield select(selectTalk());
  if (chat.length === 0) {
    yield put(loadingShow());
  }

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
  const list = yield call(auth.userRequest, `${API_DASHBOARD_MESSAGES}/${node.nid}`);

  // console.log('running saga load chat', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(loadChatError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadChatSuccess(list.data));
  }
}


/*
 * TODO: fix subject `Me` to `third eye render` when admin is logged in
 */
export function* sendTalkSaga(action) {
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
  };
  const list = yield call(auth.userRequest, API_DASHBOARD_MESSAGES_NEW, data);

  // console.log('list', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(sendTalkError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadChat());
    yield put(sendTalkSuccess());
  }
}

export function* loadChatWatcher() {
  yield* takeLatest(LOAD_CHAT, loadChatSaga);
}

export function* sendTalkWatcher() {
  // yield takeLatest(SEND_TALK, sendTalkSaga);
  let action;
  while (action = yield take(SEND_TALK)) {
    yield call(sendTalkSaga, action);
  }
}

export function* sendTalkObserver() {
  // yield takeLatest(SEND_TALK, sendTalkSaga);
  const chatWatcher = yield fork(loadChatWatcher);
  const talkWatcher = yield fork(sendTalkWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(talkWatcher);// cancel task instance
  yield cancel(chatWatcher);// cancel task instance
}

// All sagas to be loaded
export default [
  sendTalkObserver,
];
