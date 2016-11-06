/*
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import selectLogin from './selectors';
import { login } from './actions';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styles from './styles.css';

import LoginContainer from 'components/LoginContainer';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleRoute = (route) => {
    this.props.dispatch(push(route));
  }

  handleLogin = (values) => {
    // console.log('values', values.get('email'));
    // console.log('values', values.get('password'));
    this.props.dispatch(login({
      email: values.get('email'),
      password: values.get('password'),
    }));
  }

  render() {
    return (
      <div className={styles.login}>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        <LoginContainer
          handleRoute={this.handleRoute}
          handleLogin={this.handleLogin}
          formError={this.props.error}
        />
      </div>
    );
  }
}

const mapStateToProps = selectLogin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
