import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BoardRow from './board-row.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: [],
      difficulty: 'Easy',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }
  
  //this is a function for setting up the minefield
  //size represents the number of squares per side and mines is the number of mines
  buildMatrix(size, bombs) {
    let matrix = [];
    let mines = bombs;
    const probability = mines / (size * size);

    //Build a blank board

    for (let i = 0; i < size; i+= 1) {
      let row = [];
      for (let j = 0; j < size; j+= 1) {
        row.push({
          row: i,
          column: j,
          isMine: false,
          isClicked: false,
          isFlagged: false,
          minesTouching: 0,
        });
      }
      matrix.push(row);
    }

    //Function to add mines to the board

    const placeMines = (board, minesToPlace) => {
      let matrix = board;
      let mines = minesToPlace;
      let size = board.length;
      while (mines > 0) {
        for (let i = 0; i < size; i += 1) {
          for (let j = 0; j < size; j += 1) {
            const pushMine = Math.random();
            if (pushMine < probability && board[i][j].isMine === false) {
              matrix[i][j].isMine = true;
              mines -= 1;
              if (mines === 0) {
                return matrix;
              }
            }
          }
        }
      }
      return matrix;
    }

    matrix = placeMines(matrix, mines);

    // this is a function to test how many mines each position is touching around itself

    const checkMines = (matrix, row, column) => {
      let touchingMines = 0;
      if (matrix[row - 1] !== undefined) {
        if (matrix[row - 1][column] !== undefined && matrix[row - 1][column].isMine === true) {
          touchingMines += 1;
        }
        if (matrix[row - 1][column + 1] !== undefined && matrix[row - 1][column + 1].isMine === true) {
          touchingMines += 1;
        }
        if (matrix[row - 1][column - 1] !== undefined && matrix[row - 1][column - 1].isMine === true) {
          touchingMines += 1;
        }
      }
      if (matrix[row + 1] !== undefined) {
        if (matrix[row + 1][column] !== undefined && matrix[row + 1][column].isMine === true) {
          touchingMines += 1;
        }
        if (matrix[row + 1][column + 1] !== undefined && matrix[row + 1][column + 1].isMine === true) {
          touchingMines += 1;
        }
        if (matrix[row + 1][column - 1] !== undefined && matrix[row + 1][column - 1].isMine === true) {
          touchingMines += 1;
        }
      }
      if (matrix[row][column + 1] !== undefined && matrix[row][column + 1].isMine === true){
        touchingMines += 1;
      }
      if (matrix[row][column - 1] !== undefined && matrix[row][column - 1].isMine === true) {
        touchingMines += 1;
      }
      return touchingMines;
    } 

    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        let mines = checkMines(matrix, i, j);
        matrix[i][j].minesTouching = mines;
      }
    }
    return matrix;
  }

  handleClick(event){
    event.preventDefault();
    let row = event.target.id[0];
    let column = event.target.id[2];
    let newState = Object.assign({}, this.state);
    newState.board[row][column].isClicked = true;
    if (newState.board[row][column].minesTouching === 0) {
      newState.board = this.fillZeros(row, column, newState.board);
    }
    this.setState(newState);
    console.log('left');
  }

  handleRightClick(event){
    event.preventDefault();
    let row = event.target.id[0];
    let column = event.target.id[2];
    let newState = Object.assign({}, this.state);
    if (newState.board[row][column].isFlagged === false) {
      newState.board[row][column].isFlagged = true;
    } else {
      newState.board[row][column].isFlagged = false;
    }
    this.setState(newState);
    console.log('right');
  }

  //function that checks for zeros around a square and marks them as checked
  fillZeros(row, column, matrix) {
    column = Number(column);
    row = Number(row);
    debugger;
    //recursively checks for 0's and clicks them
    const checkAround = (row, column) => {
      if (matrix[row][column - 1] !== undefined && matrix[row][column - 1].isMine === false && matrix[row][column - 1].isClicked === false) {
        if (matrix[row][column - 1].minesTouching === 0) {
          matrix[row][column - 1].isClicked = true;
          checkAround(row, column - 1);
        } else {
          matrix[row][column - 1].isClicked = true;
        }
      }
      if (matrix[row][column + 1] !== undefined && matrix[row][column + 1].isMine === false && matrix[row][column + 1].isClicked === false ) {
        if (matrix[row][column + 1].minesTouching === 0) {
          matrix[row][column + 1].isClicked = true;
          checkAround(row, column + 1);
        } else {
          matrix[row][column + 1].isClicked = true;
        }
      }
      if (matrix[row - 1] !== undefined && matrix[row - 1][column].isClicked === false && matrix[row-1][column].isMine === false) {
        if (matrix[row - 1][column].minesTouching === 0 ) {
          matrix[row - 1][column].isClicked = true;
          checkAround(row - 1, column);
        } else {
          matrix[row - 1][column].isClicked = true;
        }
        
      }
      if (matrix[row + 1] !== undefined && matrix[row + 1][column].isClicked === false && matrix[row + 1][column].isMine === false) {
        if (matrix[row + 1][column].minesTouching === 0) {
          matrix[row + 1][column].isClicked = true;
          checkAround(row + 1, column);
        } else {
          matrix[row + 1][column].isClicked = true;
        }

      }
      if (matrix[row + 1] !== undefined && matrix[row + 1][column + 1] !== undefined && matrix[row + 1][column + 1].isClicked === false && matrix[row + 1][column + 1].isMine === false) {
        if (matrix[row + 1][column + 1].minesTouching === 0) {
          matrix[row + 1][column + 1].isClicked = true;
          checkAround(row + 1, column + 1);
        } else {
          matrix[row + 1][column + 1].isClicked = true;
        }

      }
      if (matrix[row + 1] !== undefined && matrix[row + 1][column - 1] !== undefined && matrix[row + 1][column - 1].isClicked === false && matrix[row + 1][column - 1].isMine === false) {
        if (matrix[row + 1][column - 1].minesTouching === 0) {
          matrix[row + 1][column - 1].isClicked = true;
          checkAround(row + 1, column + 1);
        } else {
          matrix[row + 1][column - 1].isClicked = true;
        }

      }
      if (matrix[row - 1] !== undefined && matrix[row - 1][column + 1] !== undefined && matrix[row - 1][column + 1].isClicked === false && matrix[row - 1][column + 1].isMine === false) {
        if (matrix[row - 1][column + 1].minesTouching === 0) {
          matrix[row - 1][column + 1].isClicked = true;
          checkAround(row - 1, column + 1);
        } else {
          matrix[row - 1][column + 1].isClicked = true;
        }

      }
      if (matrix[row - 1] !== undefined && matrix[row - 1][column - 1] !== undefined && matrix[row - 1][column - 1].isClicked === false && matrix[row - 1][column - 1].isMine === false) {
        if (matrix[row - 1][column - 1].minesTouching === 0) {
          matrix[row - 1][column - 1].isClicked = true;
          checkAround(row - 1, column - 1);
        } else {
          matrix[row - 1][column - 1].isClicked = true;
        }

      }
    }
    checkAround(row, column);
    return matrix;
  }

  changeDifficulty(event) {
    event.preventDefault();
    this.setState({ difficulty: event.target.value });
  }

  startGame(event) {
    event.preventDefault();
    if (this.state.difficulty === 'Easy') {
      const matrix = this.buildMatrix(10, 10);
      this.setState({ board: matrix });
    }
    if (this.state.difficulty === 'Medium') {
      const matrix = this.buildMatrix(13, 18);
      this.setState({ board: matrix });
    }
    if (this.state.difficulty === 'Medium') {
      const matrix = this.buildMatrix(20, 30);
      this.setState({ board: matrix });
    }
  }
  
  render() {
    if (this.state.board.length === 0) {
      return (
        <div>
          <select onChange={this.changeDifficulty}>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
          <button onClick={this.startGame}>START</button>
        </div>
      )
    } else {
      return (
        <div className="board">
          {
            this.state.board.map((row) => {
              return <BoardRow row={row} click={this.handleClick} rightClick={this.handleRightClick}/>
            })
          }
        </div>
      );
    }
  }
}

export default App;
