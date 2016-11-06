/**
*
* LoginContainer
*
*/

import React from 'react';
import cx from 'classnames';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import Linker from 'components/Linker';
import LoginForm from 'components/LoginForm';

class LoginContainer extends React.Component {
  render() {
    const { handleLogin, handleRoute, ...props} = this.props;
    return (
      <div className={styles.loginContainer}>
          <div className={styles.registerContainer}>
            <Linker style={{width: 270, margin: '0 auto'}}
              to='register' handleRoute={handleRoute}>
              <div className={cx(styles.emptyButton, styles.stayMid)}>
                  <FormattedMessage {...messages.registerBtn} />
              </div>
            </Linker>
          <div className={cx(styles.registerDes, styles.stayMid)}>
            <FormattedMessage {...messages.registerDes} />
          </div>
            <div className={styles.registerContainerInner}>
              <FormattedMessage {...messages.or} />
            </div>
        </div>
        <LoginForm {...props} onSubmit={handleLogin}/>

      </div>
    );
  }
}

export default LoginContainer;
