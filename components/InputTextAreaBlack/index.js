/**
*
* InputTextBlack
*
*/

import React from 'react';
import cx from 'classnames';
import styles from './styles.css';

function InputTextAreaBlack({ input, label, placeholder, type, meta: { touched, error } }) {
  // Props like value
  return (
    <div className={styles.inputTextBlack}>
      <label htmlFor={input.name} className={cx(styles.label, styles.dark)}>{label}</label>
      <div className={styles.inputWrapper}>
        <textarea rows="5" className={cx(styles.input, styles.dark)} autoComplete="new-password"
          {...input} placeholder={placeholder}/>
        {touched && error && <div className={styles.err}>{error}</div>}
      </div>
    </div>
  );
}

export default InputTextAreaBlack;
