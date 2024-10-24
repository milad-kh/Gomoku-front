'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const RealtimeGomoku = () => {
  const [board, setBoard] = useState(Array(10).fill(null).map(() => Array(10).fill(null)));
  const [playerColor, setPlayerColor] = useState('lightblue');
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [opponentName, setOpponentName] = useState('');

  useEffect(() => {
    if (loggedIn) {
      // Connect to the backend WebSocket server
      socket = io('http://localhost:5000'); // Replace with your NestJS backend URL if different

      // Listen for signals from the backend
      socket.on('receiveMove', ({ row, col, color }) => {
        setBoard((prevBoard) => {
          const newBoard = prevBoard.map((rowArray) => [...rowArray]); // Create a deep copy of the board
          newBoard[row][col] = color;
          return newBoard;
        });
        setIsMyTurn(color !== playerColor); // Set the turn to the other player
      });

      socket.on('assignColor', ({ color, opponent }) => {
        setPlayerColor(color);
        setIsMyTurn(color === 'lightblue'); // First player (lightblue) starts first
        setOpponentName(opponent);
      });

      return () => {
        // Disconnect when component unmounts
        if (socket) socket.disconnect();
      };
    }
  }, [loggedIn]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (isMyTurn && !board[rowIndex][colIndex]) {
      socket.emit('makeMove', { row: rowIndex, col: colIndex, color: playerColor });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const enteredUsername = e.target.username.value;
    const enteredPassword = e.target.password.value;

    if (
      (enteredUsername === 'milad' && enteredPassword === 'milad123') ||
      (enteredUsername === 'rooholla' && enteredPassword === 'roohi123')
    ) {
      setUsername(enteredUsername);
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input type="text" name="username" required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <h3>Opponent: {opponentName}</h3>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    width: '30px',
                    height: '30px',
                    border: '1px solid black',
                    backgroundColor: cell || 'white',
                    cursor: isMyTurn && !cell ? 'pointer' : 'not-allowed',
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RealtimeGomoku;
