import React from 'react'

class YoutubeVideo extends React.Component {
  componentDidMount () {
    this.props.ready()
  }

  render () {
    return (
      <div>
        <div
          className={`looper-player${this.props.playing ? null : ' paused'}`}
          onClick={this.props.playing ? this.props.pause : this.props.play}
        >
          {this.props.playing ? null : <div className='play-icon'></div>}
          <video
            width={560}
            height={315}
            onPlay={this.props.handleOnPlay}
            onPause={this.props.handleOnPause}
            onTimeUpdate={this.props.handleOnTimeUpdate}
            style={{display: this.props.playing ? 'block' : 'none'}}
          >
            <source src="./video/savior.mp4" type="video/mp4"/>
            Oops, something went wrong. Your browser may not support the video tag.
          </video>
        </div>
      </div>
    )
  }
}

export default YoutubeVideo
