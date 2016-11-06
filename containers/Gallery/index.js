/*
 *
 * Gallery
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';
// import scrollReveal from 'scrollreveal';

// import messages from './messages';
import styles from './styles.css';
import { loadGalleryGrid } from './actions';
import { selectList, selectCat } from './selectors';

import 'react-photoswipe/lib/photoswipe.css';
import { PhotoSwipe } from 'react-photoswipe';

import GallerySidebar from 'components/GallerySidebar';
import GalleryGrid from 'components/GalleryGrid';

export class Gallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    // window.sr = scrollReveal({ reset: true });
    this.dispatch(loadGalleryGrid(0));
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  onClick = (i) => {
    if (typeof i === 'number') {
      this.setState({
        isOpen: true,
        i,
      });
    }
  }

  handleGridLoad = (cat) => {
    this.dispatch(loadGalleryGrid(cat));
  }

  render() {
    const options = {
      index: this.state.i,
    };

    return (
      <div className={styles.galleryContainer}>
        <Helmet
          title="Gallery"
          meta={[
            { name: 'description', content: 'Description of Gallery' },
          ]}
        />
        <GallerySidebar active={this.props.cat} onClick={this.handleGridLoad} />
        <GalleryGrid list={this.props.list} onClick={this.onClick} />
        <PhotoSwipe
          isOpen={this.state.isOpen} items={this.props.list}
          options={options} onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  list: selectList(),
  cat: selectCat(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
