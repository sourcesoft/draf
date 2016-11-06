import expect from 'expect';
import paymentsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('paymentsReducer', () => {
  it('returns the initial state', () => {
    expect(paymentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
