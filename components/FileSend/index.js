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

class FileSend extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
  renderSend() {

  }
  render() {
    let doSend = true;
    if (this.state.msg !== '') {
      if (this.props.added === true) {
        doSend = false;
      }
    }
    return (
      <div className={styles.fileSend}>
        <form onSubmit={this.send.bind(this)} >
          <div className={styles.inputTextBlack}>
            <div className={styles.inputWrapper}>
              <input value={this.state.msg} onChange={this.change.bind(this)}
                className={cx(styles.input, styles.dark)} autoComplete="new-password"
                type="text" placeholder="type a message..."/>
            </div>
          </div>
          <button
            className={styles.submit} type="submit"
            disabled={doSend}
          >
            <FormattedMessage {...messages.send} />
          </button>
          <div
            className={styles.upload}
            onClick={this.props.uploadHandler}
          >
          {this.props.added ?
            <span style={{ color: '#F4A523' }}>SELECTED!</span> : 'UPLOAD'}
          </div>
        </form>
        <div className={styles.Des}><b>Supoorted files:</b> zip, rar, mp4, avi, jpg, png, psd, pdf, doc, docx, dxf, 3ds, max - <b>Max file size</b>: 50mg</div>
      </div>
    );
  }
}

export default FileSend;
