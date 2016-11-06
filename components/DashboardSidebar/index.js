/**
*
* GallerySidebar
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import GalleryCat from 'components/GalleryCat';

import styles from './styles.css';

function DashboardSidebar({ active, ...props }) {
  function isActive(current) {
    if(('/dashboard/' + current) === active)
      return true;
    return false;
  }
  return (
    <div className={styles.dashboardSidebar}>
      <GalleryCat active={isActive('talk')} id="talk" {...props}>
        <FormattedMessage {...messages.talk} />
      </GalleryCat>
      <GalleryCat active={isActive('media')} {...props} id="media">
        <FormattedMessage {...messages.media} />
      </GalleryCat>
      <GalleryCat active={isActive('payments')} {...props} id="payments">
        <FormattedMessage {...messages.payments} />
      </GalleryCat>
    </div>
  );
}

export default DashboardSidebar;
