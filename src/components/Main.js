import React from 'react'
import HomePage from './pages/HomePage'
import MusicPage from './pages/MusicPage'
import GamePage from './pages/GamePage'
import InfoPage from './pages/InfoPage'
import ProjectsPage from './pages/ProjectsPage'

import Minesweeper from './Minesweeper/Minesweeper'

class Main extends React.Component {
  state = {
    selection: 'intro'
  }

  updateSelection = e => {
    this.setState({
      selection: e.target.dataset.option
    })
  }

  renderSelection = () => {
    const { selection } = this.state;
    switch (selection) {
      case 'intro':
        return <HomePage />
      case 'music':
        return <MusicPage />
      case 'games':
        return <GamePage />
      case 'projects':
        return <ProjectsPage />
      case 'info':
        return <InfoPage />
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='navbar'>
          <div className='spacer-large'></div>
          <div
            className={`${this.state.selection === 'intro' ? 'active ' : ''}navbar-option`}
            data-option='intro'
            onClick={this.updateSelection}
          >
            Intro
          </div>
          <div
            className={`${this.state.selection === 'music' ? 'active ' : ''}navbar-option`}
            data-option='music'
            onClick={this.updateSelection}
          >
            Music
          </div>
          <div
            className={`${this.state.selection === 'games' ? 'active ' : ''}navbar-option`}
            data-option='games'
            onClick={this.updateSelection}
          >
            Games
          </div>
          <div
            className={`${this.state.selection === 'projects' ? 'active ' : ''}navbar-option`}
            data-option='projects'
            onClick={this.updateSelection}
          >
            Projects
          </div>
          <div
            className={`${this.state.selection === 'info' ? 'active ' : ''}navbar-option`}
            data-option='info'
            onClick={this.updateSelection}
          >
            Info
          </div>
          <div className='spacer-small'></div>
        </div>
        {this.renderSelection()}
      </div>
    )
  }
}

export default Main
