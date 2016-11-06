/**
*
* LargeLogo
*
*/

import React from 'react';
import cx from 'classnames';

import styles from './styles.css';
import logo from './logo.png';

function LargeLogo(props) {
  return (
    <div className={cx(styles.largeLogo)}>
      <img className={props.className} src={logo} alt="Third Eye Rendering" width="542" />
    </div>
  );
}

export default LargeLogo;
