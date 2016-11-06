/*
 *
 * Media
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import isArray from 'lodash/isArray';

import selectMedia from './selectors';
import { loadMedia, sendMedia } from 'containers/Media/actions';
import styles from './styles.css';
import Files from 'components/Files';
import FileSend from 'components/FileSend';


export class Media extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      rejected: false,
    };
  }

  componentDidMount() {
    // console.log('componentdidmount happening');
    this.props.dispatch(loadMedia());
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    // console.log('acceptedFiles', acceptedFiles);
    // console.log('rejectedFiles', rejectedFiles);
    if (isArray(rejectedFiles)) {
      // console.log('rejectedFiles', rejectedFiles);
      this.setState({
        rejected: true,
      });
    } else {
    // console.log('acceptedFiles', acceptedFiles);
      this.setState({
        rejected: false,
        files: acceptedFiles,
      });
    }
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  refresh() {
    this.props.dispatch(loadMedia());
  }

  handleSend = msg => {
    this.props.dispatch(sendMedia(msg, this.state.files[0]));
  }

  render() {
    return (
      <div className={styles.mediaGrid}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
          disableClick
          ref={(node) => { this.dropzone = node; }}
          className={styles.dropzone}
          accept="application/zip, application/x-rar-compressed, video/mp4, video/x-msvideo, application/pdf, image/*, image/vnd.adobe.photoshop, application/x-3ds, image/x-3ds,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, image/vnd.dxf"
        >
          <Files list={this.props.media} />
          <FileSend
            sub={this.handleSend}
            uploadHandler={this.onOpenClick}
            added={this.state.files.length > 0}
            rejected={this.state.rejected}
          />
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = selectMedia();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Media);
