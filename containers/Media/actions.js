/*
 *
 * Media actions
 *
 */

import {
  LOAD_MEDIA,
  LOAD_MEDIA_SUCCESS,
  LOAD_MEDIA_ERROR,
  SEND_MEDIA,
  SEND_MEDIA_SUCCESS,
  SEND_MEDIA_ERROR,
} from './constants';


export function loadMedia() {
  return {
    type: LOAD_MEDIA,
  };
}

export function loadMediaSuccess(list) {
  return {
    type: LOAD_MEDIA_SUCCESS,
    list,
  };
}

export function loadMediaError(msg) {
  return {
    type: LOAD_MEDIA_ERROR,
    msg,
  };
}

export function sendMedia(msg, file) {
  return {
    type: SEND_MEDIA,
    msg,
    file,
  };
}

export function sendMediaSuccess() {
  return {
    type: SEND_MEDIA_SUCCESS,
  };
}

export function sendMediaError(err) {
  return {
    type: SEND_MEDIA_ERROR,
    err,
  };
}
