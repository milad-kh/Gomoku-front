'use client';

import React from 'react';

const GoMoku: React.FC = () => {
  return (
    <div>
      <h1>Go-Moku Game</h1>
      <p>Welcome to the Go-Moku game! Here you can play against your friends.</p>
      {/* Add game logic and UI here */}
      <table>
        <tbody>
          {Array.from({ length: 30 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 30 }, (_, colIndex) => (
                <td key={colIndex} style={{ width: '20px', height: '20px', border: '1px solid black' }}>
                  {`${rowIndex},${colIndex}`} {/* Displaying the index numbers */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoMoku;
