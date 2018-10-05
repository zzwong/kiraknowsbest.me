import React from 'react'

class Minesweeper extends React.Component {
  state = {
    grid: null,
    ready: false,
    gameOver: false,
    unvisitedCells: new Set(),
    playerWon: false,
    time: 0,
    timer: null
  }

  componentDidMount () {
    this.resetBoard()
    this._code.innerText = `
The code:


import React from 'react'

class Minesweeper extends React.Component {
  state = {
    grid: null,
    ready: false,
    gameOver: false,
    unvisitedCells: new Set(),
    playerWon: false,
    time: 0,
    timer: null
  }

  componentDidMount () {
    this.resetBoard()
  }

  getNewGrid = () => {
    let newGrid = [];
    for (let i = 0; i < 10; i++) newGrid.push(this.getEmptyRow());
    return newGrid;
  }

  getEmptyRow = () => {
    let newArr = [];
    for (let i = 0; i < 10; i++) newArr.push([false, 0, null]);
    return newArr;
  }

  getRandomIndex = maxVal => {
    let rn = Math.random();
    let rnString = rn.toString();
    let result = 0;
    for (let i = 3; i < rnString.length; i++) {
      result += parseInt(rnString[i]);
      result %= maxVal;
    }
    return result;
  }

  isValid = (row, col) => row >= 0 && row < 10 && col >= 0 && col < 10

  isNotABomb = (grid, row, col) => grid[row][col][1] !== 'Bomb'

  incrementCell = (grid, row, col) => {
    if (this.isValid(row, col)) {
      if (this.isNotABomb(grid, row, col)) {
        grid[row][col][1] = grid[row][col][1] + 1;
      }
    }
  }

  incrementSurroundingCells = (grid, row, col) => {
    this.incrementCell(grid, row - 1, col - 1);
    this.incrementCell(grid, row - 1, col);
    this.incrementCell(grid, row - 1, col + 1);
    this.incrementCell(grid, row, col - 1);
    this.incrementCell(grid, row, col + 1);
    this.incrementCell(grid, row + 1, col - 1);
    this.incrementCell(grid, row + 1, col);
    this.incrementCell(grid, row + 1, col + 1);
  }

  fillUnvisitedCells = set => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        set.add(\`` + "${i}-${j}" + `\`);
      }
    }
  }

  resetBoard = () => {
    let newGrid = this.getNewGrid();
    let newBombs = [];
    let unvisitedCells = new Set();
    this.fillUnvisitedCells(unvisitedCells);
    while(newBombs.length < 10) {
      let row = this.getRandomIndex(9);
      let col = this.getRandomIndex(9);
      if (this.isNotABomb(newGrid, row, col)) {
        newGrid[row][col] = [false, 'Bomb', null];
        newBombs.push([row, col]);
        unvisitedCells.delete(\`` + "${row}-${col}" + `\`);
      }
    }
    for (let i = 0; i < newBombs.length; i++) {
      let curBomb = newBombs[i];
      this.incrementSurroundingCells(newGrid, curBomb[0], curBomb[1]);
    }
    if (this.state.timer !== null) window.clearInterval(this.state.timer);
    this.setState({
      grid: newGrid,
      ready: true,
      gameOver: false,
      unvisitedCells: unvisitedCells,
      playerWon: false,
      time: 0,
      timer: null
    })
  }

  getGridCopy = () => {
    let newGr = this.state.grid.map(row => row.map(square => square.slice(0)))
    return newGr
  }

  checkSquare = (i, j, grid) => {
    if (this.isValid(i, j)) {
      if (!grid[i][j][0]) {
        this.state.unvisitedCells.delete(\`` + "${i}-${j}" + `\`);
        grid[i][j][0] = true;
        if (grid[i][j][1] === 0) {
          this.checkSquare(i - 1, j - 1, grid)
          this.checkSquare(i - 1, j, grid)
          this.checkSquare(i - 1, j + 1, grid)
          this.checkSquare(i, j - 1, grid)
          this.checkSquare(i, j + 1, grid)
          this.checkSquare(i + 1, j - 1, grid)
          this.checkSquare(i + 1, j, grid)
          this.checkSquare(i + 1, j + 1, grid)
        }
      }
    }
  }

  revealSquare = e => {
    let timer = this.state.timer;
    if (this.state.unvisitedCells.size === 90) {
      timer = window.setInterval(this.timerFunction, 1000)
    }
    let i = parseInt(e.target.dataset.i);
    let j = parseInt(e.target.dataset.j);
    let newGrid = this.getGridCopy();
    if (this.isNotABomb(newGrid, i, j)) {
      this.checkSquare(i, j, newGrid);
      this.setState({
        grid: newGrid,
        playerWon: this.state.unvisitedCells.size === 0,
        timer: timer
      });
    } else {
      if (timer) window.clearInterval(timer)
      this.setState({
        gameOver: true,
        timer: null
      });
    }
  }

  timerFunction = () => {
    if (this.state.gameOver || this.state.playerWon) {
      window.clearInterval(this.state.timer)
      this.setState({
        timer: null
      })
    } else {
      this.setState({
        time: this.state.time + 1
      })
    }
  }

  getClassName = (hasBeenClicked, value, displayedValue) => {
    let names = [];
    if (this.state.playerWon || this.state.gameOver || hasBeenClicked) {
      names.push('minesweeper-visited');
      names.push(\`` + "minesweeper-${value}" + `\`);
    } else {
      names.push('minesweeper-unvisited');
    }
    return names.join(' ');
  }

  changeDisplay = e => {
    e.preventDefault();
    let i = parseInt(e.target.dataset.i);
    let j = parseInt(e.target.dataset.j);
    let newGrid = this.getGridCopy();
    if (newGrid[i][j][2] === null) {
      newGrid[i][j][2] = '🚩';
    } else if (newGrid[i][j][2] === '🚩') {
      newGrid[i][j][2] = '?';
    } else {
      newGrid[i][j][2] = null;
    }
    this.setState({
      grid: newGrid
    });
  }

  displayCell = ([hasBeenClicked, value, displayedValue], j, i) => {
    let val = value === 'Bomb' ? '💣' : value;
    return (
      <div
        onClick={this.state.gameOver ? null : this.revealSquare}
        key={\`` + "cell${i}-${j}" + `\`}
        className={\`` + "${this.getClassName(hasBeenClicked, value, displayedValue)} minesweeper-cell" + `\`}
        onContextMenu={this.changeDisplay}
        data-i={i}
        data-j={j}
      >
        {this.state.playerWon
          ? val
          : this.state.gameOver
            ? val
            : hasBeenClicked
                ? val
                : displayedValue
        }
      </div>
    )
  }

  displayRow = (row, i) => {
    return (
      <div key={\`` + "row${i}" + `\`} className='minesweeper-row'>
        {row.map((cell, j) => this.displayCell(cell, j, i))}
      </div>
    )
  }

  displayBoard = () => {
    return (
      <div className='minesweeper-container'>
        <div className='minesweeper-banner'>
          {this.state.playerWon ? 'You Win!' : null}
        </div>
        {this.state.grid.map(this.displayRow)}
      </div>
    )
  }

  render () {
    return (
      <div className='minesweeper-container'>
        <h2 className='minesweeper-header'>Minesweeper</h2>
        <div className='minesweeper-controls'>
          <div className='spacer-3'></div>
          <button className='minesweeper-control-btn' onClick={this.resetBoard}>Reset</button>
          <div className='spacer-small'></div>
          <button className='minesweeper-control-btn' onClick={this.props.quit}>Quit</button>
          <div className='spacer-small'></div>
          <div className='minesweeper-time'>{this.state.time}</div>
          <div className='spacer-3'></div>
        </div>
        {this.state.ready
          ? this.displayBoard()
          : null
        }
      </div>
    )
  }
}

export default Minesweeper
`
  }

  getNewGrid = () => {
    let newGrid = [];
    for (let i = 0; i < 10; i++) newGrid.push(this.getEmptyRow());
    return newGrid;
  }

  getEmptyRow = () => {
    let newArr = [];
    for (let i = 0; i < 10; i++) newArr.push([false, 0, null]);
    return newArr;
  }

  getRandomIndex = maxVal => {
    let rn = Math.random();
    let rnString = rn.toString();
    let result = 0;
    for (let i = 3; i < rnString.length; i++) {
      result += parseInt(rnString[i]);
      result %= maxVal;
    }
    return result;
  }

  isValid = (row, col) => row >= 0 && row < 10 && col >= 0 && col < 10

  isNotABomb = (grid, row, col) => grid[row][col][1] !== 'Bomb'

  incrementCell = (grid, row, col) => {
    if (this.isValid(row, col)) {
      if (this.isNotABomb(grid, row, col)) {
        grid[row][col][1] = grid[row][col][1] + 1;
      }
    }
  }

  incrementSurroundingCells = (grid, row, col) => {
    this.incrementCell(grid, row - 1, col - 1);
    this.incrementCell(grid, row - 1, col);
    this.incrementCell(grid, row - 1, col + 1);
    this.incrementCell(grid, row, col - 1);
    this.incrementCell(grid, row, col + 1);
    this.incrementCell(grid, row + 1, col - 1);
    this.incrementCell(grid, row + 1, col);
    this.incrementCell(grid, row + 1, col + 1);
  }

  fillUnvisitedCells = set => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        set.add(`${i}-${j}`);
      }
    }
  }

  resetBoard = () => {
    let newGrid = this.getNewGrid();
    let newBombs = [];
    let unvisitedCells = new Set();
    this.fillUnvisitedCells(unvisitedCells);
    while(newBombs.length < 10) {
      let row = this.getRandomIndex(9);
      let col = this.getRandomIndex(9);
      if (this.isNotABomb(newGrid, row, col)) {
        newGrid[row][col] = [false, 'Bomb', null];
        newBombs.push([row, col]);
        unvisitedCells.delete(`${row}-${col}`);
      }
    }
    for (let i = 0; i < newBombs.length; i++) {
      let curBomb = newBombs[i];
      this.incrementSurroundingCells(newGrid, curBomb[0], curBomb[1]);
    }
    if (this.state.timer !== null) window.clearInterval(this.state.timer);
    this.setState({
      grid: newGrid,
      ready: true,
      gameOver: false,
      unvisitedCells: unvisitedCells,
      playerWon: false,
      time: 0,
      timer: null
    })
  }

  getGridCopy = () => {
    let newGr = this.state.grid.map(row => row.map(square => square.slice(0)))
    return newGr
  }

  checkSquare = (i, j, grid) => {
    if (this.isValid(i, j)) {
      if (!grid[i][j][0]) {
        this.state.unvisitedCells.delete(`${i}-${j}`);
        grid[i][j][0] = true;
        if (grid[i][j][1] === 0) {
          this.checkSquare(i - 1, j - 1, grid)
          this.checkSquare(i - 1, j, grid)
          this.checkSquare(i - 1, j + 1, grid)
          this.checkSquare(i, j - 1, grid)
          this.checkSquare(i, j + 1, grid)
          this.checkSquare(i + 1, j - 1, grid)
          this.checkSquare(i + 1, j, grid)
          this.checkSquare(i + 1, j + 1, grid)
        }
      }
    }
  }

  revealSquare = e => {
    let timer = this.state.timer;
    if (this.state.unvisitedCells.size === 90) {
      timer = window.setInterval(this.timerFunction, 1000)
    }
    let i = parseInt(e.target.dataset.i);
    let j = parseInt(e.target.dataset.j);
    let newGrid = this.getGridCopy();
    if (this.isNotABomb(newGrid, i, j)) {
      this.checkSquare(i, j, newGrid);
      this.setState({
        grid: newGrid,
        playerWon: this.state.unvisitedCells.size === 0,
        timer: timer
      });
    } else {
      if (timer) window.clearInterval(timer)
      this.setState({
        gameOver: true,
        timer: null
      });
    }
  }

  timerFunction = () => {
    if (this.state.gameOver || this.state.playerWon) {
      window.clearInterval(this.state.timer)
      this.setState({
        timer: null
      })
    } else {
      this.setState({
        time: this.state.time + 1
      })
    }
  }

  getClassName = (hasBeenClicked, value, displayedValue) => {
    let names = [];
    if (this.state.playerWon || this.state.gameOver || hasBeenClicked) {
      names.push('minesweeper-visited');
      names.push(`minesweeper-${value}`);
    } else {
      names.push('minesweeper-unvisited');
    }
    return names.join(' ');
  }

  changeDisplay = e => {
    e.preventDefault();
    let i = parseInt(e.target.dataset.i);
    let j = parseInt(e.target.dataset.j);
    let newGrid = this.getGridCopy();
    if (newGrid[i][j][2] === null) {
      newGrid[i][j][2] = '🚩';
    } else if (newGrid[i][j][2] === '🚩') {
      newGrid[i][j][2] = '?';
    } else {
      newGrid[i][j][2] = null;
    }
    this.setState({
      grid: newGrid
    });
  }

  displayCell = ([hasBeenClicked, value, displayedValue], j, i) => {
    let val = value === 'Bomb' ? '💣' : value;
    return (
      <div
        onClick={this.state.gameOver ? null : this.revealSquare}
        key={`cell${i}-${j}`}
        className={`${this.getClassName(hasBeenClicked, value, displayedValue)} minesweeper-cell`}
        onContextMenu={this.changeDisplay}
        data-i={i}
        data-j={j}
      >
        {this.state.playerWon
          ? val
          : this.state.gameOver
            ? val
            : hasBeenClicked
                ? val
                : displayedValue
        }
      </div>
    )
  }

  displayRow = (row, i) => {
    return (
      <div key={`row${i}`} className='minesweeper-row'>
        {row.map((cell, j) => this.displayCell(cell, j, i))}
      </div>
    )
  }

  displayBoard = () => {
    return (
      <div className='minesweeper-container'>
        <div className='minesweeper-banner'>
          {this.state.playerWon ? 'You Win!' : null}
        </div>
        {this.state.grid.map(this.displayRow)}
      </div>
    )
  }

  render () {
    return (
      <div className='minesweeper-container'>
        <h2 className='minesweeper-header'>Minesweeper</h2>
        <div className='minesweeper-controls'>
          <div className='spacer-3'></div>
          <button className='minesweeper-control-btn' onClick={this.resetBoard}>Reset</button>
          <div className='spacer-small'></div>
          <button className='minesweeper-control-btn' onClick={this.props.quit}>Quit</button>
          <div className='spacer-small'></div>
          <div className='minesweeper-time'>{this.state.time}</div>
          <div className='spacer-3'></div>
        </div>
        {this.state.ready
          ? this.displayBoard()
          : null
        }
        <div ref={el => this._code = el} className="code-display"/>
      </div>
    )
  }
}

export default Minesweeper
