import { createSelector } from 'reselect';

/**
 * Direct selector to the sharedBar state domain
 */
const selectSharedBarDomain = () => state => state.get('sharedBar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SharedBar
 */

const selectSharedBar = () => createSelector(
  selectSharedBarDomain(),
  (substate) => substate.toJS()
);

export default selectSharedBar;
export {
  selectSharedBarDomain,
};
