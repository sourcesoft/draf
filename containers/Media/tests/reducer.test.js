import expect from 'expect';
import mediaReducer from '../reducer';
import { fromJS } from 'immutable';

describe('mediaReducer', () => {
  it('returns the initial state', () => {
    expect(mediaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
