/**
*
* GalleryCat
*
*/

import React from 'react';
import cx from 'classnames';

import styles from './styles.css';

function GalleryCat({ active, id, children, onClick, bottom }) {
  function handleClick() {
    onClick(id);
  }

  return (
    <div onClick={handleClick.bind(this)}
      className={cx(active && styles.active, bottom && styles.bottom, styles.galleryCat)}
    >
      {children}
    </div>
  );
}

export default GalleryCat;
