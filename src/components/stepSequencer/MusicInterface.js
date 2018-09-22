import React from 'react'

class MusicInterface extends React.Component {
  state = {
    playing: false,
    intervalId: null,
    speed: 140,
    instrumentsToPlay: [['kick'], [], ['hihat'], [], ['kick', 'snare'], [], ['hihat'], []]
  }

  setSpacebarToPlay = e => {
    if (e.key === ' ') {
      this.play()
    }
  }

  toggleActiveClass = e => {
    let key = e.target.dataset.key;
    let step = parseInt(e.target.dataset.step);
    let newInstrumentsToPlay = this.state.instrumentsToPlay.slice(0);
    if (e.target.classList.contains('music-active')) {
      newInstrumentsToPlay[step-1].splice(newInstrumentsToPlay[step-1].indexOf(key), 1)
    } else {
      newInstrumentsToPlay[step-1].push(key);
    }
    this.setState({
      instrumentsToPlay: newInstrumentsToPlay
    });
    e.target.classList.toggle('music-active')
  }

  componentDidMount = () => {
    this._kick = document.getElementById('kick-audio')
    this._hihat = document.getElementById('hihat-audio')
    this._clap = document.getElementById('clap-audio')
    this._snare = document.getElementById('snare-audio')
    document.body.addEventListener('keydown', this.setSpacebarToPlay, true)
  }

  componentWillUnmount = () => {
    document.body.removeEventListener('keydown', this.setSpacebarToPlay, true)
    if (this.state.playing) this.play()
  }

  play = () => {
    if (this.state.playing) {
      this.clickOnPause(0);
    } else {
      let currentStep = 0;
      let intervalId = setInterval(() => {
        if (currentStep === 8) currentStep = 0;
        for (let i = 0; i < this.state.instrumentsToPlay[currentStep].length; i++) {
          let sound = this[`_${this.state.instrumentsToPlay[currentStep][i]}`];
          sound.currentTime = 0;
          sound.play();
        }
        currentStep++;
      }, this.state.speed)
      this.setState({
        playing: true,
        intervalId: intervalId
      })
    }
  }

  clickOnPause = playAfter => {
    window.clearInterval(this.state.intervalId)
    this.setState({
      playing: false,
      intervalId: null,
    }, () => {
      if (playAfter) this.play()
    })
  }

  slowDown = () => {
    let wasPlaying = this.state.playing
    let newSpeed = this.state.speed + 5
    if (1050 - newSpeed < 1) newSpeed = 1049
    this.setState({
      speed: newSpeed
    }, () => {
      this.clickOnPause(wasPlaying)
    })
  }

  speedUp = () => {
    let wasPlaying = this.state.playing
    let newSpeed = this.state.speed - 5
    if (1050 - newSpeed > 1000) newSpeed = 50
    this.setState({
      speed: newSpeed
    }, () => {
      this.clickOnPause(wasPlaying)
    })
  }

  slideSpeed = e => {
    let val = 1050 - e.target.value;
    let wasPlaying = this.state.playing;
    this.setState({
      speed: val
    }, () => {
      this.clickOnPause(wasPlaying)
    })
  }

  render () {
    return (
      <div className="music-main-wrapper">
        <h2 className='music-heading'>Step Sequencer</h2>
        <div className='music-description'>
          <p>Click play to hear the music! Feel free to change the instruments around and change the tempo, too!</p>
          <p>You can also switch between play / pause by using the [spacebar] .</p>
          <p>You can use the arrow buttons to change the speed a little bit, or use the slider to change the speed by a large amount!</p>
        </div>
        <div className="music-control-panel">
          <div onClick={this.play} className={`music-${this.state.playing ? 'pause' : 'play'}-btn music-btn`}>{this.state.playing ? 'Pause' : 'Play'}</div>
          <div onClick={this.slowDown} className="music-slow-btn music-btn">{'<<'}</div>
          <div onClick={this.speedUp} className="music-fast-btn music-btn">{'>>'}</div>
          <input onChange={this.slideSpeed} type="range" min="1" max="1000" value={1050 - this.state.speed} className="music-slider" id="speedRange"/>
        </div>
        <div className="music-step-row">
          <div className="music-track-name">Kick</div>
          <div onClick={this.toggleActiveClass} className="music-step music-step1 music-active" data-step="1" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step2" data-step="2" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step3" data-step="3" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step4" data-step="4" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step5 music-active" data-step="5" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step6" data-step="6" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step7" data-step="7" data-key="kick"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step8" data-step="8" data-key="kick"></div>
        </div>
        <div className="music-step-row">
          <div className="music-track-name">Hihat</div>
          <div onClick={this.toggleActiveClass} className="music-step music-step1" data-step="1" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step2" data-step="2" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step3 music-active" data-step="3" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step4" data-step="4" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step5" data-step="5" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step6" data-step="6" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step7 music-active" data-step="7" data-key="hihat"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step8" data-step="8" data-key="hihat"></div>
        </div>
        <div className="music-step-row">
          <div className="music-track-name">Clap</div>
          <div onClick={this.toggleActiveClass} className="music-step music-step1" data-step="1" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step2" data-step="2" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step3" data-step="3" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step4" data-step="4" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step5" data-step="5" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step6" data-step="6" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step7" data-step="7" data-key="clap"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step8" data-step="8" data-key="clap"></div>
        </div>
        <div className="music-step-row">
          <div className="music-track-name">Snare</div>
          <div onClick={this.toggleActiveClass} className="music-step music-step1" data-step="1" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step2" data-step="2" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step3" data-step="3" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step4" data-step="4" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step5 music-active" data-step="5" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step6" data-step="6" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step7" data-step="7" data-key="snare"></div>
          <div onClick={this.toggleActiveClass} className="music-step music-step8" data-step="8" data-key="snare"></div>
        </div>
      </div>
    )
  }
}

export default MusicInterface
