/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import sizeMe from 'react-sizeme';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import 'react-photoswipe/lib/photoswipe.css';
import { PhotoSwipe } from 'react-photoswipe';
import scrollReveal from 'scrollreveal';

import SocialVertical from 'components/SocialVertical';
import Introduction from 'components/Introduction';
import RegisterContainer from 'components/RegisterContainer';
import GalleryGrid from 'components/GalleryGridHome';
import Footer from 'components/Footer';

import { loadGalleryGrid } from './actions';
import { register } from 'containers/Register/actions';

import { selectLogged, selectLoading } from 'containers/App/selectors';
import { galleryList, selectUsername } from './selectors';
import { createStructuredSelector } from 'reselect';


import styles from './styles.css';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      isOpen: false,
    };
  }
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    // $('#fullpage').fullpage({
    //   verticalCentered: false,
    //   navigation: true,
    //   navigationPosition: 'right',
    //   navigationTooltips: ['Home', 'Second page', 'Third and last page']
    // });
    window.sr = scrollReveal({ reset: true });
    window.sr.reveal('.introduction');
    // console.log(this.props.size.width)
    if (this.props.size.width > 768) {
      this.dispatch(loadGalleryGrid(-1));
    } else {
      this.dispatch(loadGalleryGrid(-2));
    }
  }

  componentWillUnmount() {
    // if (typeof $.fn.fullpage.destroy == 'function') {
    //   $.fn.fullpage.destroy('all');
    // }
  }

  // Register stuff
  handleLogin = (values) => {
    // console.log('values', values.get('email'));
    // console.log('values', values.get('password'));
    this.props.dispatch(register({
      name: values.get('name'),
      email: values.get('email'),
      password: values.get('password'),
    }));
  }

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  handleRoute = (route) => {
    this.props.dispatch(push(route));
  }


  renderRegister = () => {
    if (this.props.logged) {
      return null;
    }
    return (
      <div className={`section ${styles.sectionForth}`}>
        <div className={styles.registerDes}>
          Register now for free and submit your issue and wait for us
          to reply with a proposal to finish the job. If you liked what you
          see we start working under your deadline.
        </div>
        <RegisterContainer
          isHome={true}
          handleRoute={this.handleRoute}
          handleLogin={this.handleLogin}
          formError={this.props.error}
        />
        <div className={`${styles.overlayForth}`}></div>
      </div>
    );
  }

  // gallery stuff
  onItemClick = (i) => {
    if (typeof i === 'number') {
      this.setState({
        isOpen: true,
        i,
      });
    }
  }
  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const options = {
      index: this.state.i,
    };
    // console.log(this.props.list);

    return (
      <section>
        <Helmet
          title="Interior & Exterior Architectural Design"
          meta={[
            { name: 'description', content: 'Interior & Exterior Architectural Design. Register for free and submit your issue and wait for us to reply with a proposal to finish the job. If you liked what you see we start working under your deadline.' },
          ]}
        />
        <div id="fullpage" className={styles.fullpage}>

          <div className={`section ${styles.sectionFirst}`}>
            <div className={`${styles.overlayFirst}`}></div>
            <div className={`${styles.sectionContent}`}>
              <SocialVertical />
              <Introduction handleRoute={this.handleRoute} />
            </div>
          </div>

          <div className={`section ${styles.sectionSecond}`}>
            <div className={`${styles.overlaySecond}`}></div>
            <div className={styles.galleryHeader}>Some of our recent works</div>
            <GalleryGrid list={this.props.list} onClick={this.onItemClick} />
            <PhotoSwipe
              isOpen={this.state.isOpen} items={this.props.list}
              options={options} onClose={this.handleClose}
            />
          </div>

          <div className={`section ${styles.sectionThird}`}>
            <div className={`${styles.overlayThird}`}></div>
          </div>

          { this.renderRegister() }

          <Footer />
        </div>
      </section>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  username: selectUsername(),
  loading: selectLoading(),
  logged: selectLogged(),
  list: galleryList(),
  // error: selectError(),
});

HomePage.propTypes = {
  dispatch: React.PropTypes.func,
  size: React.PropTypes.object,
  changeRoute: React.PropTypes.func,
  logged: React.PropTypes.bool,
};

// Wrap the component to inject dispatch and state into it
const wrappedPage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default sizeMe()(wrappedPage);
