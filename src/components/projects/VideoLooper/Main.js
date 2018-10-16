import React from 'react'
import YoutubeVideo from './YoutubeVideo'
import TimeControl from './TimeControl'

class Main extends React.Component {
  state = {
    startPosition: 85,
    endPosition: 642,
    duration: 0,
    retryCount: 0,
    endAt: 0,
    startAt: 0,
    playing: false
  }

  componentDidMount () {
    this._code.innerText = `
The code:


import React from 'react'
import YoutubeVideo from './YoutubeVideo'
import TimeControl from './TimeControl'

class Main extends React.Component {
  state = {
    startPosition: 85,
    endPosition: 642,
    duration: 0,
    retryCount: 0,
    endAt: 0,
    startAt: 0,
    playing: false
  }

  // set function that assigns eventListeners

  setPlayerSettings = () => {
    // 124 is max duration
    // startPosition 0 and endPosition 550
    // should play 0 - 124 seconds
    // each 4.435483870967742 px is one second
    const conversion = 4.435483870967742;
    let v = this._video;
    let duration = v.duration;
    let startAt = Math.floor((this.state.startPosition - 85) / conversion);
    let endAt = Math.ceil((this.state.endPosition - 85) / conversion);
    this.setState({
      startAt,
      endAt
    })
  }

  calculateInitialState = () => {
    this.setState({
      duration: this._video.duration
    }, this.setPlayerSettings)
  }

  captureVideo = () => {
    let root = document.querySelector('.looper-player');
    if (!root) {
      return null;
    }

    let q = [root];

    while (q.length > 0) {
      let node = q.shift();

      if (node.tagName.toLowerCase() === 'video') {
        return node;
      } else {
        for (let i = 0; i < node.children.length; i++) {
          q.push(node.children[i])
        }
      }
    }

    return null;
  }

  videoIsReady = () => {
    let vid = this.captureVideo();
    if (!vid) {
      if (this.state.retryCount > 15) {
        this.setState({
          errorGettingVideo: true
        });
      } else {
        this.setState({
          retryCount: this.state.retryCount + 1
        });
        setTimeout(() => {
          this.videoIsReady();
        }, 750);
      }
    } else {
      this._video = vid;
      setTimeout(() => {
        this.calculateInitialState();
      }, 500)
    }
  }

  updateDuration = val => this.setState({duration: val})

  changeHandler = (selection, value) => {
    let newStart, newEnd;
    let currStart = this.state.startPosition;
    let currEnd = this.state.endPosition;
    if (selection === 'start') {
      newStart = Math.max(85, value);
      newEnd = Math.min(642, Math.max(newStart + 10, currEnd));
    } else {
      newEnd = Math.min(642, value);
      newStart = Math.max(85, Math.min(newEnd - 10, currStart));
    }

    this.setState({
      startPosition: newStart,
      endPosition: newEnd
    }, this.setPlayerSettings)
  }

  handleOnTimeUpdate = e => {
    let v = this._video;
    if (Math.floor(v.currentTime) >= Math.floor(this.state.endAt) - 2 || Math.floor(v.currentTime) < Math.floor(this.state.startAt)) {
      v.pause();
      v.currentTime = this.state.startAt;
      v.play();
    }
  }

  handleOnPause = e => {
    this.setState({playing: false})
    let v = this._video;
    if (Math.floor(v.currentTime) >= Math.floor(this.state.endAt) - 2) {
      v.currentTime = this.state.startAt;
    } else {
      v.currentTime = Math.max(this.state.startAt, v.currentTime);
    }
  }

  handleOnPlay = e => {
    this.setState({playing: true})
    let v = this._video;
    if (Math.floor(v.currentTime) >= Math.floor(this.state.endAt) - 2) {
      v.currentTime = this.state.startAt;
    } else {
      v.currentTime = Math.max(this.state.startAt, v.currentTime);
    }
  }

  pause = () => {
    let v = this._video;
    v.pause();
    this.setState({
      playing: false
    });
  }

  play = () => {
    const instance = this;
    try {
      let v = this._video;
      v.play();
    }
    catch (e) {
      console.error(e)
    }
    finally {
      this.setState({
        playing: true
      });
    }
  }

  render () {
    return (
      <div className='video-looper-container'>
        <YoutubeVideo
          ready={this.videoIsReady}
          handleOnPlay={this.handleOnPlay}
          handleOnPause={this.handleOnPause}
          handleOnTimeUpdate={this.handleOnTimeUpdate}
          playing={this.state.playing}
          play={this.play}
          pause={this.pause}
        />
        <TimeControl
          changeHandler={this.changeHandler}
          start={this.state.startPosition}
          end={this.state.endPosition}
        />
        <div className='video-looper-description'>
          <p>Moving the two orange circles will set the start and stop points for the looping video!</p>
        </div>
      </div>
    )
  }
}

export default Main;


// TimeControl.js

import React from 'react'

class TimeControl extends React.Component {
  state = {
    currentlyDragging: false
  }

  handleMouseDown = () => {
    this.setState({
      currentlyDragging: true
    })
  }

  handleMouseMove = (e, selection) => {
    let val = e.pageX - 15;
    if (this.state.currentlyDragging) {
      if (val < 85) val = 85;
      if (val > 642) val = 642;
      this.props.changeHandler(selection, val);
    }
  }

  handleMouseUp = () => {
    this.setState({
      currentlyDragging: false
    })
  }

  render () {
    return (
      <div className='looper-controls'>
        <div
          className="looper-selector-wrapper"
        >
          <div
            onMouseMove={e => this.handleMouseMove(e, 'start')}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            className="looper-thumb"
            style={{left: \`` + "${this.props.start}px" + `\`}}
          />
          <div
            onMouseMove={e => this.handleMouseMove(e, 'end')}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            className="looper-thumb"
            style={{left: \`` + "${this.props.end}px" + `\`}}
          />
          <div
            className="looper-selection"
            style={{left: \`` + "${this.props.start + 15}px" + `\`, width: \`` + "${(this.props.end - this.props.start)}px" + `\`}}
          />
        </div>
      </div>
    )
  }
}

export default TimeControl


// YoutubeVideo.js

import React from 'react'

class YoutubeVideo extends React.Component {
  componentDidMount () {
    this.props.ready()
  }

  render () {
    return (
      <div>
        <div
          className={\`` + "looper-player${this.props.playing ? null : ' paused'}" + `\`}
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
    `
  }
  // set function that assigns eventListeners

  setPlayerSettings = () => {
    // 124 is max duration
    // startPosition 0 and endPosition 550
    // should play 0 - 124 seconds
    // each 4.435483870967742 px is one second
    const conversion = 4.435483870967742;
    let v = this._video;
    let duration = v.duration;
    let startAt = Math.floor((this.state.startPosition - 85) / conversion);
    let endAt = Math.ceil((this.state.endPosition - 85) / conversion);
    this.setState({
      startAt,
      endAt
    })
  }

  calculateInitialState = () => {
    this.setState({
      duration: this._video.duration
    }, this.setPlayerSettings)
  }

  captureVideo = () => {
    let root = document.querySelector('.looper-player');
    if (!root) {
      return null;
    }

    let q = [root];

    while (q.length > 0) {
      let node = q.shift();

      if (node.tagName.toLowerCase() === 'video') {
        return node;
      } else {
        for (let i = 0; i < node.children.length; i++) {
          q.push(node.children[i])
        }
      }
    }

    return null;
  }

  videoIsReady = () => {
    let vid = this.captureVideo();
    if (!vid) {
      if (this.state.retryCount > 15) {
        this.setState({
          errorGettingVideo: true
        });
      } else {
        this.setState({
          retryCount: this.state.retryCount + 1
        });
        setTimeout(() => {
          this.videoIsReady();
        }, 750);
      }
    } else {
      this._video = vid;
      setTimeout(() => {
        this.calculateInitialState();
      }, 500)
    }
  }

  updateDuration = val => this.setState({duration: val})

  changeHandler = (selection, value) => {
    let newStart, newEnd;
    let currStart = this.state.startPosition;
    let currEnd = this.state.endPosition;
    if (selection === 'start') {
      newStart = Math.max(85, value);
      newEnd = Math.min(642, Math.max(newStart + 10, currEnd));
    } else {
      newEnd = Math.min(642, value);
      newStart = Math.max(85, Math.min(newEnd - 10, currStart));
    }

    this.setState({
      startPosition: newStart,
      endPosition: newEnd
    }, this.setPlayerSettings)
  }

  handleOnTimeUpdate = e => {
    let v = this._video;
    if (Math.floor(v.currentTime) >= Math.floor(this.state.endAt) - 2 || Math.floor(v.currentTime) < Math.floor(this.state.startAt)) {
      v.pause();
      v.currentTime = this.state.startAt;
      v.play();
    }
  }

  handleOnPause = e => {
    this.setState({playing: false})
    let v = this._video;
    if (Math.floor(v.currentTime) >= Math.floor(this.state.endAt) - 2) {
      v.currentTime = this.state.startAt;
    } else {
      v.currentTime = Math.max(this.state.startAt, v.currentTime);
    }
  }

  handleOnPlay = e => {
    this.setState({playing: true})
    let v = this._video;
    if (Math.floor(v.currentTime) >= Math.floor(this.state.endAt) - 2) {
      v.currentTime = this.state.startAt;
    } else {
      v.currentTime = Math.max(this.state.startAt, v.currentTime);
    }
  }

  pause = () => {
    let v = this._video;
    v.pause();
    this.setState({
      playing: false
    });
  }

  play = () => {
    const instance = this;
    try {
      let v = this._video;
      v.play();
    }
    catch (e) {
      console.error(e)
    }
    finally {
      this.setState({
        playing: true
      });
    }
  }

  render () {
    return (
      <div>
        <div className='video-looper-container'>
          <YoutubeVideo
            ready={this.videoIsReady}
            handleOnPlay={this.handleOnPlay}
            handleOnPause={this.handleOnPause}
            handleOnTimeUpdate={this.handleOnTimeUpdate}
            playing={this.state.playing}
            play={this.play}
            pause={this.pause}
          />
          <TimeControl
            changeHandler={this.changeHandler}
            start={this.state.startPosition}
            end={this.state.endPosition}
          />
          <div className='video-looper-description'>
            <p>Moving the two orange circles will set the start and stop points for the looping video!</p>
          </div>
        </div>
        <code>
          <div ref={el => this._code = el} className="code-display">
          </div>
        </code>
      </div>
    )
  }
}

export default Main;
