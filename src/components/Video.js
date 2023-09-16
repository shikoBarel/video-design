import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Video extends Component {
  render() {
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player fixed-bottom'
          url={this.props.url}
          width='50%'
          height='50%'
          controls={true}
          onProgress={this.props.onProgress} // Pass the onProgress prop
        />
      </div>
    );
  }
}

export default Video;
