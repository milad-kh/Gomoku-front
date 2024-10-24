// app/page.tsx

'use client';

import React from 'react';
import Link from 'next/link'; // Import Link from next/link

const games = [
  { id: 1, name: 'Go-Moku' },
  { id: 2, name: 'Chess' },
  { id: 3, name: 'Sudoku' },
  { id: 4, name: 'Crossword Puzzle' },
  { id: 5, name: 'Memory Game' },
];

const GamesList: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Mental Games</h1>
      <ul className="space-y-2">
        {games.map((game) => (
          <li
            key={game.id}
            className="p-4 bg-white rounded shadow hover:bg-gray-200 transition"
          >
            <Link href={`/${game.name.replace(/\s+/g, '').toLowerCase()}`}> {/* Link to the game page */}
              {game.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
