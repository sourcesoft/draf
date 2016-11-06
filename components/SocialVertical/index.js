/**
*
* SocialVertical
*
*/

import React from 'react';


import styles from './styles.css';
import fb from './icon-fb.png';
import ins from './icon-ins.png';
import twitter from './icon-twitter.png';

function SocialVertical() {
  return (
    <div className={styles.socialVertical}>
      <a className={styles.a} href="http://instagram.com/me"><img src={ins} width="35" /></a>
      <a className={styles.a} href="http://facebook.com/me"><img src={fb} width="35" /></a>
      <a className={styles.a} href="http://twitter.com/me"><img src={twitter} width="35" /></a>
    </div>
  );
}

export default SocialVertical;
