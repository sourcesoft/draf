import { createSelector } from 'reselect';

/**
 * Direct selector to the talk state domain
 */
const selectTalkDomain = () => state => state.get('talk');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Talk
 */

const selectTalk = () => createSelector(
  selectTalkDomain(),
  (substate) => substate.toJS()
);

export default selectTalk;
export {
  selectTalkDomain,
};
