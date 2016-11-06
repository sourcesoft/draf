import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboard state domain
 */
const selectDashboardDomain = () => state => state.get('dashboard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Dashboard
 */

const selectDashboard = () => createSelector(
  selectDashboardDomain(),
  (substate) => substate.toJS()
);

const selectNid = () => createSelector(
  selectDashboardDomain(),
  (substate) => substate.get('nid')
);

const selectNodes = () => createSelector(
  selectDashboardDomain(),
  (substate) => substate.get('nodes')
);

const selectActive = () => createSelector(
  selectDashboardDomain(),
  (substate) => substate.get('active')
);

export default selectDashboard;
export {
  selectDashboardDomain,
  selectNid,
  selectNodes,
  selectActive,
};
