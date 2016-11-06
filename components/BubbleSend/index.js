/**
*
* BubbleSend
*
*/

import React from 'react';
import cx from 'classnames';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class BubbleSend extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
  }
  change(e) {
    this.setState({
      msg: e.target.value
    })
  }
  send(e) {
    e.preventDefault();
    this.props.sub(this.state.msg);
    this.setState({
      msg: ''
    })
  }
  render() {
    return (
      <div className={styles.bubbleSend}>
        <form onSubmit={this.send.bind(this)} >
          <div className={styles.inputTextBlack}>
            <div className={styles.inputWrapper}>
              <input value={this.state.msg} onChange={this.change.bind(this)}
                className={cx(styles.input, styles.dark)} autoComplete="new-password"
                type="text" placeholder="type a message..."/>
            </div>
          </div>
            <button className={styles.submit} type="submit"
              disabled={this.state.msg===''?true:false}>
              <FormattedMessage {...messages.send} />
            </button>
          </form>
        </div>
    );
  }
}

export default BubbleSend;
