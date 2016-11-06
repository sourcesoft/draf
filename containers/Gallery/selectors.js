import { createSelector } from 'reselect';

/**
 * Direct selector to the gallery state domain
 */
const selectGalleryDomain = () => state => state.get('gallery');

/**
 * Other specific selectors
 */
const selectCat = () => createSelector(
 selectGalleryDomain(),
 (substate) => substate.get('cat')
);

const selectList = () => createSelector(
 selectGalleryDomain(),
 (substate) => substate.get('list')
);

/**
 * Default selector used by Gallery
 */

const selectGallery = () => createSelector(
  selectGalleryDomain(),
  (substate) => substate.toJS()
);

export default selectGallery;
export {
  selectGalleryDomain,
  selectCat,
  selectList
};
