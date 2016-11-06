/**
*
* TopMenu
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import messages from './messages';
import sizeMe from 'react-sizeme';

import styles from './styles.css';
import SmallLogo from 'components/SmallLogo';
import Linker from 'components/Linker';
import LocaleToggle from 'containers/LocaleToggle';

export class TopMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  isActive(menu) {
    return this.props.active == menu ? styles.active :'';
  }
  isDashboard() {
    return (this.props.active === '/dashboard' || this.props.active === '/dashboard/talk')? styles.active : '';
  }

  userBtns() {
    const { active, bg, user, ...props } = this.props;
    if(this.props.user === 1) {
      return (
        <span>
        <div className={cx(this.isDashboard(), styles.rightLink, styles.login)}>
          <Linker to="/dashboard" {...props}>
            <FormattedMessage {...messages.dashboard} />
          </Linker>
        </div>
        <div className={cx(styles.rightLink, styles.login)}>
          <Linker to="/logout" {...props}>
            <FormattedMessage {...messages.logout} />
          </Linker>
        </div>
      </span>
      );
    } else {
      return (
        <div className={cx(this.isActive('/login'), styles.rightLink, styles.login)}>
          <Linker to="/login" {...props}>
            <FormattedMessage {...messages.loginRegister} />
          </Linker>
        </div>
      );
    }
  }

  render() {
    const { active, bg, user, ...props } = this.props;

    if (props.size.width >= 768) {
      // Actually rendering
      return (
        <div className={cx(bg && styles.bg, styles.topMenu)} >

          <div className={styles.homeLink}>
            <Linker to="/" {...props}>
              <SmallLogo className={styles.smallLogo} />
              <FormattedMessage {...messages.home} />
            </Linker>
          </div>

          <div className={cx(styles.rightLink)}>
            <LocaleToggle />
          </div>

          {this.userBtns()}


          <div className={styles.rightLink}>
            <Linker to="/contact" {...props}>
              <FormattedMessage {...messages.contact} />
            </Linker>
          </div>

          <div className={styles.rightLink}>
            <Linker>
              <FormattedMessage {...messages.company} />
            </Linker>
          </div>

          <div className={cx(this.isActive('/faq'), styles.rightLink)}>
            <Linker to="/faq" {...props}>
              <FormattedMessage {...messages.faq} />
            </Linker>
          </div>

          <div className={cx(this.isActive('/gallery'), styles.rightLink)}>
            <Linker to="/gallery" {...props}>
              <FormattedMessage {...messages.gallery} />
            </Linker>
          </div>
        </div>
      );
    } else {
      return (
        <div className={cx(bg && styles.bg, styles.topMenu)} >

          <div onClick={this.props.openDock} className={styles.menuLink}>
            <span className={styles.menuIcon}>=</span>
            <FormattedMessage {...messages.menu} />
          </div>

          {this.userBtns()}

        </div>
      );
    }
  }
}

export default sizeMe()(TopMenu);
