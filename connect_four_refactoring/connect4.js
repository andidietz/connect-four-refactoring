class Game {
    constructor(p1, p2, WIDTH, HEIGHT) {
      this.WIDTH = WIDTH
      this.HEIGHT = HEIGHT
      this.board = []
      this.currPlayer = p1
      this.players = [p1, p2]
      this.makeBoard()
      this.makeHtmlBoard()
    }
    makeBoard = () => {
      this.board = []
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({ length: this.WIDTH }))
      }
    }
  
    makeHtmlBoard = () => {
      const htmlBoard = document.getElementById('board')
  
      const top = document.createElement('tr')
      top.setAttribute('id', 'column-top')
      this.startClick = this.handleClick.bind(this)
      top.addEventListener('click', this.handleClick)
  
      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement('td')
        headCell.setAttribute('id', x)
        top.append(headCell)
      }
      htmlBoard.append(top)
  
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement('tr')
  
        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement('td')
          cell.setAttribute('id', `${y}-${x}`)
          row.append(cell)
        }
  
        htmlBoard.append(row)
      }
    }

    findSpotForCol = (x) => {
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y
        }
      }
      return null
    }
  
    placeInTable = (y, x) => {
      const piece = document.createElement('div')
      piece.classList.add('piece')
      piece.style.backgroundColor = this.currPlayer.color
      piece.style.top = -50 * (y + 2)
  
      const spot = document.getElementById(`${y}-${x}`)
      spot.append(piece)
    }
  
    endGame = (msg) => {
      alert(msg)
    }
  
    handleClick = (evt) => {
      const x = +evt.target.id
      
      const y = this.findSpotForCol(x)
      if (y === null) {
        return
      }
  
      this.board[y][x] = this.currPlayer
      this.placeInTable(y, x)
      
      if (this.checkForWin()) {
        top.removeEventListener('click', this.startClick)
        return this.endGame(`Player ${this.currPlayer} won!`)
      }
      
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!')
      }
      
      this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0]
    }
  
    checkForWin = () => {
    
        const _win = (cells) => {
            cells.every(
            ([y, x]) => {
              y >= 0 &&
              y < this.HEIGHT &&
              x >= 0 &&
              x < this.WIDTH &&
              this.board[y][x] === this.currPlayer
            }
          )
      }
  
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]
  
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true
          }
        }
      }
    }
  }

  class Player {
    constructor(pColor) {
      this.pColor = pColor
    }
  }
  
  function setupGame() {
    const p1Color = document.querySelector('#p1-color').value
    const p2Color = document.querySelector('#p2-color').value
    const p1 = new Player(p1Color)
    const p2 = new Player(p2Color)
    new Game(p1, p2, 5, 6)
  }

  const start = document.querySelector('.start')
  start.addEventListener('click', setupGame)