import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';
import Footer from 'components/Footer';

import styles from './styles.css';

export class Faq extends React.Component {
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage = () => {
    this.openRoute('/');
  };

  render() {
    return (
      <div>
        <div className={styles.container}>
          <Helmet
            title="FAQ"
            meta={[
              { name: 'description', content: 'Frequently Asked Questions' },
            ]}
          />
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <p className={styles.listItemTitle}>
                FAQ
              </p>
              <p>
              FAQ
              </p>
            </li>

            <li className={styles.listItem}>
              <p className={styles.listItemTitle}>
              FAQ
              </p>
              <p>
              FAQ
              </p>
            </li>

          </ul>
          <Button handleRoute={this.openHomePage}>
            Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
}

Faq.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Faq);
