/*
 *
 * SharedBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TopMenu from 'components/TopMenu';
import { createStructuredSelector } from 'reselect';
import { selectLogged } from 'containers/App/selectors';

export class SharedBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleRoute = (route) => {
    this.props.dispatch(push(route));
  }
  userRole() {
    return this.props.logged ? 1 : 0;
  }
  render() {
    // Anything but main page for now
    const bg = (this.props.menu !== '/');

    return (
      <div>
        <TopMenu
          openDock={this.props.openDock}
          bg={bg}
          user={this.userRole()}
          active={this.props.menu}
          handleRoute={this.handleRoute}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  logged: selectLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedBar);
