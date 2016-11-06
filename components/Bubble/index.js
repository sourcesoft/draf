/**
*
* Bubble
*
*/

import React from 'react';

import styles from './styles.css';

function Bubble({ data }) {
  return (
    <div className={styles.bubble}>
      <div className={styles.header}>
        <div className={styles.from}>
          { data.subject }
        </div>
        <div className={styles.date}>
          { data.created }
        </div>
      </div>
      <div className={styles.body}>
        { data.body }
      </div>
    </div>
  );
}

export default Bubble;
