/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_NODE_SUCCESS,
  LOAD_NODE_LIST_SUCCESS,
  ACTIVE,
} from './constants';

const initialState = fromJS({ active: false });

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NODE_SUCCESS:
      return state.set('nid', action.nid);
    case LOAD_NODE_LIST_SUCCESS:
      return state.set('nodes', action.list);
    case ACTIVE:
      return state.set('active', action.value);
    default:
      return state;
  }
}

export default dashboardReducer;
