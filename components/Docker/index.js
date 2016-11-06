/**
*
* Docker
*
*/

import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FormattedMessage } from 'react-intl';
import messages from 'components/TopMenu/messages';
import styles from './styles.css';
import SmallLogo from 'components/SmallLogo';
import Linker from 'components/Linker';
import LocaleToggle from 'containers/LocaleToggle';

class Docker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleRoute = (route) => {
    this.props.openDock();
    this.props.dispatch(push(route));
  }
  render() {
    return (
      <div className={styles.docker}>
        <div className={cx(styles.icon, styles.links)}>
          <Linker to='/' handleRoute={this.handleRoute}>
            <SmallLogo className={styles.smallLogo} />
            <FormattedMessage {...messages.home} />
          </Linker>
        </div>
        <div className={styles.links}>
          <Linker to='/gallery' handleRoute={this.handleRoute}>
            <FormattedMessage {...messages.gallery} />
          </Linker>
        </div>
        <div className={styles.links}>
          <Linker to='/faq' handleRoute={this.handleRoute}>
            <FormattedMessage {...messages.faq} />
          </Linker>
        </div>
        <div className={styles.links}>
          <Linker to='/company' handleRoute={this.handleRoute}>
            <FormattedMessage {...messages.company} />
          </Linker>
        </div>
        <div className={styles.links}>
          <Linker to='/contact' handleRoute={this.handleRoute}>
            <FormattedMessage {...messages.contact} />
          </Linker>
        </div>
        <div className={cx(styles.lang, styles.links)}>
          <span className={styles.langLabel}>Language</span>
          <LocaleToggle />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Docker);

// export default Docker;
