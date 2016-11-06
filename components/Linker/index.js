/**
*
* Linker
*
*/

import React from 'react';
import styles from './styles.css';


function Linker({style, ...props}) {
  function changeRoute() {
    if(props.handleRoute)
      props.handleRoute(props.to);
  }
  return (
    <div className={styles.buttonWrapper} style={style} >
      <button onClick={changeRoute} className={styles.cursor}>
        {props.children}
      </button>
    </div>
  );
}

export default Linker;
