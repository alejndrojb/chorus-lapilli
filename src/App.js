import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currPlayer, setCurrPlayer] = useState("X");
  const [moves, setMoves] = useState(0);
  const [lastPiece, setlastPiece] = useState(null);

  function handleClick(i) {
    const nextSquares = squares.slice();
    
    if (calculateWinner(squares)) {
      return;
    }

    if (squares[i]) {
      setlastPiece(i);
      return;
    }
  
    if (moves < 6) {
      nextSquares[i] = currPlayer;
      setMoves(moves + 1);
    }
    else {
      if (isAdjacent(lastPiece, i) && squares[lastPiece] === currPlayer) {
        const centerBoard = squares[4];
        if (centerBoard !== currPlayer || lastPiece === 4) {
          nextSquares[lastPiece] = null;
          nextSquares[i] = currPlayer;
        } 
        else {
          const tempSquares = squares.slice();
          tempSquares[lastPiece] = null;
          tempSquares[i] = currPlayer;
          if (calculateWinner(tempSquares)) {
            nextSquares[lastPiece] = null;
            nextSquares[i] = currPlayer;
          } else { 
            return; 
          }
        }
      } else { 
        return; 
      }
    }
    setSquares(nextSquares);
    setCurrPlayer(getNextPlayer(currPlayer));
  }

  function getNextPlayer(currPlayer) { return currPlayer === "X" ? "O" : "X"; }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setCurrPlayer("X");
    setlastPiece(null);
    setMoves(0);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " is the Winner!"; 
  } else {
    status = "Next Player: " + currPlayer;
  }

  return (
    <>
    <h1 class="game-title">Chorus-Lapilli</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick= { () => handleClick(0) }/>
        <Square value={squares[1]} onSquareClick= { () => handleClick(1) }/>
        <Square value={squares[2]} onSquareClick= { () => handleClick(2) }/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick= { () => handleClick(3) }/>
        <Square value={squares[4]} onSquareClick= { () => handleClick(4) }/>
        <Square value={squares[5]} onSquareClick= { () => handleClick(5) }/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick= { () => handleClick(6) }/>
        <Square value={squares[7]} onSquareClick= { () => handleClick(7) }/>
        <Square value={squares[8]} onSquareClick= { () => handleClick(8) }/>
      </div>
      <div className="reset-board">
      <button onClick={resetBoard}>Reset Board</button>
      </div> 
    </> 
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isAdjacent(lastPiece, i) {
  const rowDiff = Math.abs(Math.floor(lastPiece / 3) - Math.floor(i / 3));
  const colDiff = Math.abs((lastPiece % 3) - (i % 3));
  
  return (rowDiff <= 1 && colDiff <= 1);
}
