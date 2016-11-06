/**
*
* SmallLogo
*
*/

import React from 'react';


import styles from './styles.css';
import logo from './thin.png';

function SmallLogo(props) {
  return (
    <div className={`${props.className} ${styles.smallLogo}`}>
      <img src={logo} alt="Third Eye Rendering" width="45" />
    </div>
  );
}

export default SmallLogo;
