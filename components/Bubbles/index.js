/**
*
* Bubbles
*
*/

import React from 'react';
import cx from 'classnames';

import Bubble from 'components/Bubble';
import styles from './styles.css';

class Bubbles extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderItems() {
    const { list, isAdmin, ...props } = this.props;
    if (list) {
      return list.map((data, i) => {
        return (<Bubble i={data.cid} key={i} data={data} {...props} />);
      });
    }
  }
  render() {
    return (
      <div
        className={
          cx(
            styles.bubbles,
            this.props.stickTop ? styles.bubblesTop : null,
            this.props.payments ? styles.payments : null,
          )
        }
      >
        { this.renderItems() }
      </div>
    );
  }
}

export default Bubbles;
