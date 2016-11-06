/*
 *
 * Logout
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import selectLogout from './selectors';
import auth from 'utils/auth';

export class Logout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    auth.logout();
    this.props.dispatch(push(''));
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = selectLogout();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
