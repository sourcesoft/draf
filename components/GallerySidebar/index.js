/**
*
* GallerySidebar
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import GalleryCat from 'components/GalleryCat';

import styles from './styles.css';

export class GallerySidebar extends React.Component {
  componentDidMount() {
    console.log('this.props', this.props);
  }

  isActive = (current) => {
    const active = this.props.active;
    if (current === active) return true;
    return false;
  }
  render() {
    const { active, ...props } = this.props;
    return (
      <div className={styles.gallerySidebar}>
        <GalleryCat active={this.isActive(0)} id={0} {...props}>
          <FormattedMessage {...messages.latest} />
        </GalleryCat>
        <GalleryCat active={this.isActive(1)} {...props} id={1}>
          <FormattedMessage {...messages.interior} />
        </GalleryCat>
        <GalleryCat active={this.isActive(2)} {...props} id={2}>
          <FormattedMessage {...messages.exterior} />
        </GalleryCat>
        <GalleryCat {...props} bottom id={999}>
          <FormattedMessage {...messages.download} />
          <br />
          <FormattedMessage {...messages.catalog} />
        </GalleryCat>
      </div>
    );
  }
}

export default GallerySidebar;
