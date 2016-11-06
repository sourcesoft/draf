/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import Sidebar from 'react-sidebar';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import ProgressBar from 'components/ProgressBar';
import SharedBar from 'containers/SharedBar';
import Loading from 'containers/Loading';
import Docker from 'components/Docker';

import styles from './styles.css';
import './main.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      progress: -1,
    };
  }

  componentDidMount() {
    // Store a reference to the listener.
    this.unsubscribeHistory = this.props.router.listen(() => this.setState({ progress: 0 }));
  }

  componentDidUpdate() {
    // Add a condition to prevent infinite loop.
    if (this.state.progress !== 100) {
      this.setState({ // eslint-disable-line
        progress: 100,
      });
    }
  }

  componentWillUnmount() {
    // Prevent memory leak since listeners won't be garbage collected.
    this.unsubscribeHistory = undefined;
  }

  onSetOpen = (open) => {
    this.setState({ open });
  }

  menuButtonClick = (ev) => {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  openDock = () => {
    this.onSetOpen(!this.state.open);
  }

  closeOnBehind = () => {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }
  }

  render() {
    const path = this.props.location.pathname;
    const isHome = path === '/'
                || path === '/gallery'
                || path === '/dashboard'
                || path === '/dashboard/talk'
                || path === '/dashboard/media'
                || path === '/dashboard/payments';

    const sidebar = (<div className={styles.sidebar}>
      <Docker openDock={this.openDock} />
    </div>);

    const sidebarProps = {
      sidebar,
      docked: false,
      open: this.state.open,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 50,
      dragToggleDistance: 30,
      onSetOpen: this.onSetOpen,
      contentClassName: 'contentInside',
    };

    return (
      <Sidebar {...sidebarProps}>
        <div
          onClick={this.closeOnBehind}
          className={isHome ? styles.screenHome : styles.screen}
        >
          <Helmet
            titleTemplate="%s - Third Eye Render"
            defaultTitle="Third Eye Render"
            meta={[
              { name: 'description', content: 'Interior & Exterior Architectural Design. Register for free and submit your issue and wait for us to reply with a proposal to finish the job. If you liked what you see we start working under your deadline.' },
            ]}
          />
          <ProgressBar percent={this.state.progress} />
          <div className={`${styles.topMenu}`}>
            <SharedBar openDock={this.openDock} menu={this.props.location.pathname} />
          </div>
          <Loading />
          {React.Children.toArray(this.props.children)}
        </div>
      </Sidebar>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
};

export default withRouter(App);
