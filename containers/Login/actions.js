/*
 *
 * Login actions
 *
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

export function login(values) {
  return {
    type: LOGIN,
    values
  };
}

export function loginError(values) {
  return {
    type: LOGIN_ERROR,
    values
  };
}

export function loginSuccess(values) {
  return {
    type: LOGIN_SUCCESS,
    values
  };
}
