/**
*
* Introduction
*
*/

import React from 'react';
import cx from 'classnames';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import LargeLogo from 'components/LargeLogo';
import HighlightBtn from 'components/HighlightBtn';
import Linker from 'components/Linker';

function Introduction({ handleRoute, ...props }) {
  return (
    <div className={cx('introduction', styles.introduction)}>
      <LargeLogo className={styles.img} />
      <div className={styles.subTitle}>
        <FormattedMessage {...messages.subTitle} />
        <HighlightBtn className={cx('highlight-btn', styles.highlightBtns)}>
          <Linker to="/faq" handleRoute={handleRoute}>
            <FormattedMessage {...messages.howBtn} />
          </Linker>
        </HighlightBtn>
        <HighlightBtn className={styles.highlightBtns}>
          <Linker to="/gallery" handleRoute={handleRoute}>
            <FormattedMessage {...messages.galleryBtn} />
          </Linker>
        </HighlightBtn>
      </div>
    </div>
  );
}

export default Introduction;
