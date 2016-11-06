/*
 *
 * Register actions
 *
 */

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

export function register(values) {
  return {
    type: REGISTER,
    values
  };
}

export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerError() {
  return {
    type: REGISTER_ERROR,
  };
}
