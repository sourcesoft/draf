/**
*
* LoginForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import InputTextBlack from 'components/InputTextBlack';
import InputTextAreaBlack from 'components/InputTextAreaBlack';


const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.get('body')) {
    errors.password = 'Required'
  }
  if (!values.get('email')) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { handleSubmit, pristine, reset, submitting, formError, invalid } = this.props;
    return (
      <div className={styles.loginForm}>
        <div className={styles.header}>Contact Form</div>
        <div className={styles.err}>
          {formError && formError===0 && 'Problem signing in, check internet connection.' || ''}
        </div>
        <form onSubmit={handleSubmit} autoComplete="new-password">
          <Field name="email" type="email" component={InputTextBlack} label="Email"
            placeholder="Enter your valid email address"/>
          <Field name="body" component={InputTextAreaBlack} label="Body"
            placeholder="Enter yours message body here..."/>
          <div>
            <button className={styles.submit} type="submit"
              disabled={pristine || submitting || invalid}>Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'contactForm',  // a unique identifier for this form
  validate
})(LoginForm);
