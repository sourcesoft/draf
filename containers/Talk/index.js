/*
 *
 * Talk
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectTalk from './selectors';
import { loadChat, sendTalk } from 'containers/Talk/actions';
import Bubbles from 'components/Bubbles';
import BubbleSend from 'components/BubbleSend';
import styles from './styles.css';

/*
  @TODO Make refresh every 10 sec when this route is active
 */
export class Talk extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // console.log('componentdidmount happening');
    this.props.dispatch(loadChat());
    setInterval(() => {
      this.refresh();
    }, 20000);
  }
  refresh() {
    this.props.dispatch(loadChat());
  }
  handleSend = msg => {
    // console.log('msg', msg);
    this.props.dispatch(sendTalk(msg));
  }
  render() {
    return (
      <div className={styles.talkGrid}>
        <div>
          <Bubbles list={this.props.chat} />
          <BubbleSend sub={this.handleSend} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectTalk();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Talk);
