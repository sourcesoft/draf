/*
 *
 * Contact actions
 *
 */

import {
  CONTACT,
  CONTACT_ERROR,
  CONTACT_SUCCESS,
} from './constants';

export function contact(values) {
  return {
    type: CONTACT,
    values
  };
}

export function contactError(values) {
  return {
    type: CONTACT_ERROR,
    values
  };
}

export function contactSuccess(values) {
  return {
    type: CONTACT_SUCCESS,
    values
  };
}
