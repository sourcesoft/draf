/**
*
* Bubble
*
*/

import React from 'react';

import styles from './styles.css';

function File({ data }) {
  const root = window.location.protocol + "//" + window.location.hostname +
    (window.location.port ? ':' + window.location.port: '');
  return (
    <div className={styles.file}>
      <div className={styles.header}>
        <div className={styles.from}>
          { data.subject }
        </div>
        <div className={styles.date}>
          { data.created }
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.des}>
          { data.body }
        </div>
        <div className={styles.download}>
          <a href={`${root}${data.file}`} download>Download</a>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}

export default File;
