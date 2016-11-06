/**
*
* GalleryGrid
*
*/

import React from 'react';
import cx from 'classnames';


import styles from './styles.css';
import GalleryItem from 'components/GalleryItem';

function GalleryGrid({list, ...props}) {
  function renderItems() {
    if(list) {
      return list.map((data, i) => {
        return <GalleryItem i={i} key={i} data={data} {...props}/>
      })
    }
  }
  return (
    <div {...props} className={cx('gallery-grid', styles.galleryGrid)}>
      {renderItems()}
    </div>
  );
}

export default GalleryGrid;
