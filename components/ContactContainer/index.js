/**
*
* Contact Container
*
*/

import React from 'react';
import cx from 'classnames';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import Linker from 'components/Linker';
import ContactForm from 'components/ContactForm';

class ContactContainer extends React.Component {
  render() {
    const { handleContact, ...props} = this.props;
    return (
      <div className={styles.contactContainer}>
        <ContactForm {...props} onSubmit={handleContact}/>
      </div>
    );
  }
}

export default ContactContainer;
