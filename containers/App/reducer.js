/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOADING_SHOW,
  LOADING_HIDE,
  CHANGE_USER,
  LOGGED,
  ROLE,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  logged: false,
  userData: fromJS({
    repositories: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_SHOW:
      return state.set('loading', true)
    case LOADING_HIDE:
      return state.set('loading', false)
    case ROLE:
      return state
        .set('role', action.value)
    case LOGGED:
      return state
        .set('logged', action.value)
    default:
      return state;
  }
}

export default appReducer;
