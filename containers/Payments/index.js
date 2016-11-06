/*
 *
 * Payments
 *
 */

import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import selectPayments from './selectors';
import { createStructuredSelector } from 'reselect';
import { selectRole } from 'containers/App/selectors';
import { loadPayments, sendPayments } from 'containers/Payments/actions';
import Bubbles from 'components/Bubbles';
import BubbleSend from 'components/BubbleSend';
import styles from './styles.css';

export class Payments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // console.log('componentdidmount happening');
    this.props.dispatch(loadPayments());
  }
  refresh() {
    this.props.dispatch(loadPayments());
  }
  handleSend = msg => {
    // console.log('msg', msg);
    this.props.dispatch(sendPayments(msg));
  }
  render() {
    return (
      <div className={styles.paymentsGrid}>
        <div>
          <Bubbles stickTop={this.props.role === 0} payments list={this.props.paymentsSelector.payments} />
          { this.props.role ?
            <BubbleSend sub={this.handleSend} />
          : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paymentsSelector: selectPayments(),
  role: selectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
