/*
 *
 * Register
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import selectRegister from './selectors';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styles from './styles.css';
import { register } from './actions';
import RegisterContainer from 'components/RegisterContainer';

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleRoute = (route) => {
    this.props.dispatch(push(route));
  }

  handleLogin = (values) => {
    // console.log('values', values.get('email'));
    // console.log('values', values.get('password'));
    this.props.dispatch(register({
      name: values.get('name'),
      email: values.get('email'),
      password: values.get('password'),
    }));
  }

  render() {
    return (
      <div className={styles.register}>
        <Helmet
          title="Register"
          meta={[
            { name: 'description', content: 'Description of Register' },
          ]}
        />
        <RegisterContainer
          handleRoute={this.handleRoute}
          handleLogin={this.handleLogin}
          formError={this.props.error}
        />
      </div>
    );
  }
}

const mapStateToProps = selectRegister();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
