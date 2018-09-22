import React from 'react'
import Minesweeper from '../Minesweeper/Minesweeper'

class GamePage extends React.Component {
  state = {
    game: null
  }

  selectGame = e => {
    this.setState({
      game: e.target.dataset.name
    })
  }

  unsetGame = () => {
    this.setState({
      game: null
    })
  }

  renderGame = () => {
    if (this.state.game === 'minesweeper') return (
      <div className='game-page-content'>
        <Minesweeper quit={this.unsetGame}/>
      </div>
    )
  }

  render () {
    return (
      <div className='game-page'>
        <h2>Games</h2>
        {this.state.game
          ? this.renderGame()
          : (
            <div className='game-page-content'>
              <div className='spacer-small'></div>
              <div onClick={this.selectGame} data-name='minesweeper' className='game-option'>Minesweeper</div>
              <div className='spacer-small'></div>
            </div>
          )
        }
      </div>
    )
  }
}

export default GamePage
