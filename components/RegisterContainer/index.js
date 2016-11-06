/**
*
* RegisterContainer
*
*/

import React from 'react';
import cx from 'classnames';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import messagesLogin from 'components/LoginContainer/messages';
import styles from './styles.css';

import Linker from 'components/Linker';
import RegisterForm from 'components/RegisterForm';

class RegisterContainer extends React.Component {
  renderOr() {
    if(!this.props.isHome) {
      return (
        <div className={styles.registerContainer}>
        <div className={styles.registerContainerInner}>
          <FormattedMessage {...messagesLogin.or} />
        </div>
        <Linker style={{width: 270, margin: '0 auto'}}
          to='/login' handleRoute={this.props.handleRoute}>
          <div className={cx(styles.emptyButton, styles.stayMid)}>
              <FormattedMessage {...messages.loginBtn} />
          </div>
        </Linker>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const { isHome, handleLogin, handleRoute, error, ...props} = this.props;
    return (
      <div className={cx(isHome?styles.home:'', styles.registerContainer)}>
        <RegisterForm {...props} onSubmit={handleLogin}/>
          { this.renderOr() }
      </div>
    );
  }
}

export default RegisterContainer;
