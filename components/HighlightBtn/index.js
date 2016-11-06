/**
*
* HighlightBtn
*
*/

import React from 'react';
import cx from 'classnames';

import styles from './styles.css';

function HighlightBtn(props) {
  return (
    <div onClick={props.click} className={cx(props.className, styles.highlightBtn)}>
      {props.children}
    </div>
  );
}

export default HighlightBtn;
