/*
 *
 * Talk actions
 *
 */

import {
  LOAD_CHAT,
  LOAD_CHAT_SUCCESS,
  LOAD_CHAT_ERROR,
  SEND_TALK,
  SEND_TALK_SUCCESS,
  SEND_TALK_ERROR,
} from './constants';

export function loadChat() {
  return {
    type: LOAD_CHAT,
  };
}

export function loadChatSuccess(list) {
  return {
    type: LOAD_CHAT_SUCCESS,
    list,
  };
}

export function loadChatError(msg) {
  return {
    type: LOAD_CHAT_ERROR,
    msg,
  };
}

export function sendTalk(msg) {
  return {
    type: SEND_TALK,
    msg,
  };
}

export function sendTalkSuccess() {
  return {
    type: SEND_TALK_SUCCESS,
  };
}

export function sendTalkError(err) {
  return {
    type: SEND_TALK_ERROR,
    err,
  };
}
