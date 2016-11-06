/**
*
* GalleryItem
*
*/

import React from 'react';
import cx from 'classnames';


import styles from './styles.css';

function GalleryItem({ data, onClick, i, ...props }) {
  return (
    <div onClick={onClick.bind(null, i)} className={cx('gallery-item', styles.galleryItem)}>
      <img src={data.msrc} alt={data.title} />
    </div>
  );
}

export default GalleryItem;
