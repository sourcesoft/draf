/*
 *
 * Payments actions
 *
 */

 import {
   LOAD_PAYMENTS,
   LOAD_PAYMENTS_SUCCESS,
   LOAD_PAYMENTS_ERROR,
   SEND_PAYMENTS,
   SEND_PAYMENTS_SUCCESS,
   SEND_PAYMENTS_ERROR,
 } from './constants';

 export function loadPayments() {
   return {
     type: LOAD_PAYMENTS,
   };
 }

 export function loadPaymentsSuccess(list) {
   return {
     type: LOAD_PAYMENTS_SUCCESS,
     list,
   };
 }

 export function loadPaymentsError(msg) {
   return {
     type: LOAD_PAYMENTS_ERROR,
     msg,
   };
 }

 export function sendPayments(msg) {
   return {
     type: SEND_PAYMENTS,
     msg,
   };
 }

 export function sendPaymentsSuccess() {
   return {
     type: SEND_PAYMENTS_SUCCESS,
   };
 }

 export function sendPaymentsError(err) {
   return {
     type: SEND_PAYMENTS_ERROR,
     err,
   };
 }
