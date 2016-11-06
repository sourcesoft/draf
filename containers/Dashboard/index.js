/*
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styles from './styles.css';
import DashboardSidebar from 'components/DashboardSidebar';
import { loadNode, loadNodeList, loadNodeSuccess, setActive } from 'containers/Dashboard/actions';
import { selectNid, selectNodes, selectActive } from 'containers/Dashboard/selectors';
import { selectRole } from 'containers/App/selectors';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // we load current node data
    this.props.dispatch(loadNode());
    // we load all nodes data
    setTimeout(() => {
      this.props.dispatch(loadNodeList());
    }, 200);
    // active is false for default for admins to select
    // has no effect for customers
    this.props.dispatch(setActive(false));
  }

  handleRoute = (route) => {
    this.props.dispatch(push(`/dashboard/${route}`));
  }

  handleNid(nid, title) {
    // set current active node in dashboard.nid
    this.props.dispatch(loadNodeSuccess({
      nid,
      title,
    }));
    this.props.dispatch(setActive(true));
  }

  renderSelector() {
    // Render select list for admin, happens when active is false
    const self = this;
    const nodes = this.props.nodes;
    // console.log('nodes', nodes);
    if (nodes) {
      return nodes.map((val, i) => {
        return (
          <div
            className={styles.list}
            onClick={self.handleNid.bind(self, val.nid, val.title)}
            key={i}>
            {i + 1} - {val.title}
            <div className={styles.last}>
              {val.last}
            </div>
          </div>
        );
      });
    }
  }

  renderDetail() {
    // Render sidebar
    return (
      <DashboardSidebar
        active={this.props.location.pathname}
        onClick={this.handleRoute}
        bot={this.props.nid && this.props.nid.title}
      />
      );
  }

  renderFront() {
    // This is sidebar area of template

    // If user is admin show select list of nodes
    if (this.props.role === 1) {
      // If user haven't selected which user to manage yet
      if (this.props.active === false) {
        // render select list in full fluid wrapper
        return this.renderSelector();
      } else {
        // If user has selected which user to manage render that user welcome node
        // render sidebar
        return this.renderDetail();
      }
    } else {
      return this.renderDetail();
    }
  }

  renderChildren() {
    // This is the content area of template which renders /talk /media / payments

    // render talk, media, payments if we're not in dashboard root
    // means we dont have react-router children and not admin
    if (this.props.children === null) {
      // This means we are in root address of /dashboard not nested routes
      // So we need to show welcome message
      // If user is not admin OR is admin but has selected which user to manage
      if ((this.props.role === 0) || (this.props.role === 1 && this.props.active === true)) {
        return (
          <div className={styles.intro} >
            <div className={styles.nodeIntro}>
            Welcome!
            </div>
            <div className={styles.nodeTitle}>
              {this.props.nid && this.props.nid.title}
            </div>
            <div className={styles.nodeIntro}>
              Click on Talk button to start chating with us.
            </div>
          </div>
        );
      }
    } else {
      // We are in nested routes like /dashboard/talk
      return this.props.children;
    }
  }

  render() {
    // console.log(this.props.children);
    return (
      <div className={styles.dashboardContainer}>
        <Helmet
          title="Dashboard"
          meta={[
            { name: 'description', content: 'Description of Dashboard' },
          ]}
        />
        {this.renderFront()}
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nid: selectNid(),
  nodes: selectNodes(),
  role: selectRole(),
  active: selectActive(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
