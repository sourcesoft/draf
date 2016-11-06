/**
*
* Bubbles
*
*/

import React from 'react';

import File from 'components/File';
import styles from './styles.css';

class Files extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderItems() {
    const { list, ...props } = this.props;
    if (list) {
      return list.map((data, i) => {
        return (<File i={data.cid} key={i} data={data} {...props} />);
      });
    }
  }
  render() {
    return (
      <div className={styles.files}>
        { this.renderItems() }
      </div>
    );
  }
}

export default Files;
