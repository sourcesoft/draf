/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);

const galleryList = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('list')
);

export {
  selectHome,
  selectUsername,
  galleryList,
};
