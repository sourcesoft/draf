/**
*
* NextCircle
*
*/

import React from 'react';


import styles from './styles.css';

function NextCircle(props) {
  return (
    <div onClick={props.click} className={styles.nextCircle}>
    <svg width="52px" height="52px">
        <defs></defs>
        <g id="landings" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Desktop-HD" transform="translate(-664.000000, -877.000000)" stroke="#FFFFFF" strokeWidth="2">
                <g id="Section-one" transform="translate(-80.000000, -1.000000)">
                    <g id="scroll" transform="translate(731.000000, 818.000000)">
                        <g id="Group-7" transform="translate(14.000000, 61.000000)">
                            <circle id="Oval-6" cx="25" cy="25" r="25"></circle>
                            <g id="Group" transform="translate(12.735849, 20.754717)" strokeLinecap="square">
                                <path d="M0.167059748,0.167059748 L11.8612421,12.1953616" id="Line"></path>
                                <path d="M12.1953616,0.167059748 L23.889544,12.1953616" id="Line" transform="translate(18.042453, 6.181211) scale(-1, 1) translate(-18.042453, -6.181211) "></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
    </div>
  );
}

export default NextCircle;
