/*
 *
 * Dashboard actions
 *
 */

import {
  LOAD_NODE,
  LOAD_NODE_SUCCESS,
  LOAD_NODE_ERROR,
  LOAD_NODE_LIST,
  LOAD_NODE_LIST_SUCCESS,
  LOAD_NODE_LIST_ERROR,
  ACTIVE,
} from './constants';

export function loadNode() {
  return {
    type: LOAD_NODE,
  };
}

export function loadNodeSuccess(nid) {
  return {
    type: LOAD_NODE_SUCCESS,
    nid
  };
}

export function loadNodeError(err) {
  return {
    type: LOAD_NODE_ERROR,
    err
  };
}

export function loadNodeList() {
  return {
    type: LOAD_NODE_LIST,
  };
}

export function loadNodeListSuccess(list) {
  return {
    type: LOAD_NODE_LIST_SUCCESS,
    list
  };
}

export function loadNodeListError(err) {
  return {
    type: LOAD_NODE_LIST_ERROR,
    err
  };
}

export function setActive(value) {
  return {
    type: ACTIVE,
    value
  };
}
