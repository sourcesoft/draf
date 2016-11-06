/*
 *
 * Contact
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectContact from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import Footer from 'components/Footer';
import H1 from 'components/H1';
import Button from 'components/Button';
import ContactContainer from 'components/ContactContainer';
import { contact, contactSuccess } from './actions';

export class Contact extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleContact = values => {
    this.props.dispatch(contact({
      from: values.get('email'),
      body: values.get('body'),
    }));
  }

  isSubmitted = () => {
    if (this.props.success) {
      return (
        <div>
          <br />
          <br />
          <H1>Message submitted successfuly!</H1>
          <br />
          <br />
          <Button onClick={this.subAgain}>Send another message</Button>
        </div>
      );
    }
    return (
      <div>
        <ContactContainer
          handleContact={this.handleContact}
          formError={this.props.error}
        />
      </div>
    );
  }

  subAgain = () => {
    this.props.dispatch(contactSuccess(false));
  }

  render() {
    return (
      <div>
        <div className={styles.contact}>
          <Helmet
            title="Contact"
            meta={[
              { name: 'description', content: 'Contact Us' },
            ]}
          />
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
          <div>
            <FormattedMessage {...messages.callUs} />
            <br />
            <FormattedMessage {...messages.registerUs} />
          </div>
        { this.isSubmitted() }
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = selectContact();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
