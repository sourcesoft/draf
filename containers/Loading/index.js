/*
 *
 * Loading
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectLoading } from 'containers/App/selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import Loader from 'halogen/PulseLoader';

export class Loading extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderLoading() {
    if(this.props.loading) {
      return (<Loader color="#F5A623" size="16px" margin="4px"/>);
      // return 'Loading...';
    }
  }
  render() {
    return (
      <div className={styles.loading}>
        { this.renderLoading() }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
