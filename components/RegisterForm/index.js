/**
*
* RegisterForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import InputTextBlack from 'components/InputTextBlack';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'Required'
  } else if (/[^a-zA-Z0-9 ]/i.test(values.get('name'))) {
    errors.name = 'Must contain only words and numbers'
  }
  if (!values.get('password')) {
    errors.password = 'Required'
  } else if (values.get('password').length < 6) {
    errors.password = 'Must be more than 6 characters'
  }
  if (!values.get('email')) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class RegisterForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, pristine, reset, submitting, formError, invalid } = this.props;
    return (
        <div className={styles.registerForm}>
          <div className={styles.header}>Register For Free</div>
          <div className={styles.err}>
            {formError && formError===2 && 'Wrong email or password, please check again.' || ''}
            {formError && formError===0 && 'Problem signing up, check internet connection.' || ''}
          </div>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            <Field name="name" type="text" component={InputTextBlack} label="Name"
              placeholder="Enter your full name or company's name"/>
            <Field name="email" type="email" component={InputTextBlack} label="Email"
              placeholder="Enter your valid email address"/>
            <Field name="password" type="password" component={InputTextBlack} label="Password"
              placeholder="Must be more than 6 characters"/>
            <div>
              <button className={styles.submit} type="submit"
                disabled={pristine || submitting || invalid}>Register</button>
            </div>
          </form>
        </div>
    );
  }
}

export default reduxForm({
  form: 'registerForm',  // a unique identifier for this form
  validate
})(RegisterForm);
