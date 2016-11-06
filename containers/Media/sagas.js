import { call, put, select, take, fork, cancel } from 'redux-saga/effects';
import { takeLatest, delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_NODE_SUCCESS } from 'containers/Dashboard/constants';
import { LOAD_MEDIA, SEND_MEDIA } from 'containers/Media/constants';
import { loadMedia, loadMediaSuccess, loadMediaError,
          sendMediaSuccess, sendMediaError } from 'containers/Media/actions';
import auth from 'utils/auth';
import { API_DASHBOARD_MEDIAS,
         API_DASHBOARD_MEDIAS_NEW,
         API_DASHBOARD_MEDIAS_UPLOAD } from 'utils/config';
import { loadingShow, loadingHide } from 'containers/App/actions';
import { selectNid } from 'containers/Dashboard/selectors';
import { selectRole } from 'containers/App/selectors';

export function* loadMediaSaga() {
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
  const list = yield call(auth.userRequest, `${API_DASHBOARD_MEDIAS}/${node.nid}`);

  // console.log('running saga load chat', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(loadMediaError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadMediaSuccess(list.data));
  }
}


/*
 * TODO: fix subject `Me` to `third eye render` when admin is logged in
 */
export function* sendMediaSaga(action) {
  yield put(loadingShow());
  // console.log('action.msg', action.msg);
  // console.log('send saga called once here');
  const node = yield select(selectNid());
  const uploaded = yield call(auth.userUpload, API_DASHBOARD_MEDIAS_UPLOAD, action.file);

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
        value: uploaded.data.name,
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
    field_attachment: [
      {
        target_id: uploaded.data.fid,
      },
    ],
    field_comment_type: [
      {
        target_id: 4, // Media term in taxonomy
      },
    ],
  };
  const list = yield call(auth.userRequest, API_DASHBOARD_MEDIAS_NEW, data);

  // console.log('list', list);
  // `false` if not athenticated or the actual `object` if it's ok
  if (!list) {
    yield put(sendMediaError(list.err));
    yield put(loadingHide());
  } else {
    yield put(loadingHide());
    yield put(loadMedia());
    yield put(sendMediaSuccess());
  }
}

export function* loadMediaWatcher() {
  yield* takeLatest(LOAD_MEDIA, loadMediaSaga);
}

export function* sendMediaWatcher() {
  // yield takeLatest(SEND_TALK, sendTalkSaga);
  let action;
  while (action = yield take(SEND_MEDIA)) {
    yield call(sendMediaSaga, action);
  }
}

export function* sendMediaObserver() {
  // yield takeLatest(SEND_TALK, sendTalkSaga);
  const chatWatcher = yield fork(loadMediaWatcher);
  const talkWatcher = yield fork(sendMediaWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(talkWatcher);// cancel task instance
  yield cancel(chatWatcher);// cancel task instance
}

// All sagas to be loaded
export default [
  sendMediaObserver,
];
