import { createSelector } from 'reselect';

/**
 * Direct selector to the media state domain
 */
const selectMediaDomain = () => state => state.get('media');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Media
 */

const selectMedia = () => createSelector(
  selectMediaDomain(),
  (substate) => substate.toJS()
);

export default selectMedia;
export {
  selectMediaDomain,
};
