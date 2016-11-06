/**
*
* GalleryGrid
*
*/

import React from 'react';
import cx from 'classnames';


import styles from './styles.css';
import GalleryItemHome from 'components/GalleryItemHome';

function GalleryGridHome({list, ...props}) {
  function renderItems() {
    if(list) {
      return list.map((data, i) => {
        return <GalleryItemHome i={i} key={i} data={data} {...props}/>
      })
    }
  }
  return (
    <div {...props} className={cx('gallery-grid', styles.galleryGridHome)}>
      {renderItems()}
    </div>
  );
}

export default GalleryGridHome;
