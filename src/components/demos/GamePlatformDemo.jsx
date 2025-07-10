import React, { useState, useEffect } from 'react';

const GamePlatformDemo = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentPuzzle, setCurrentPuzzle] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Player1', score: 850, rank: 1 },
    { name: 'Player2', score: 720, rank: 2 },
    { name: 'Player3', score: 680, rank: 3 },
    { name: 'Player4', score: 590, rank: 4 },
    { name: 'Player5', score: 520, rank: 5 },
  ]);
  const [onlinePlayers, setOnlinePlayers] = useState(127);
  const [friends, setFriends] = useState([
    { name: 'Alex', status: 'online', game: 'Puzzle Quest' },
    { name: 'Sarah', status: 'online', game: 'Strategy Wars' },
    { name: 'Mike', status: 'away', game: 'Idle' },
  ]);

  const generatePuzzle = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    const puzzle = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        row.push(colors[Math.floor(Math.random() * colors.length)]);
      }
      puzzle.push(row);
    }
    setCurrentPuzzle(puzzle);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setSelectedTiles([]);
    generatePuzzle();
  };

  const handleTileClick = (row, col) => {
    if (gameState !== 'playing') return;
    
    const newSelected = [...selectedTiles];
    const tileKey = `${row}-${col}`;
    
    if (newSelected.includes(tileKey)) {
      setSelectedTiles(newSelected.filter(tile => tile !== tileKey));
    } else {
      newSelected.push(tileKey);
      setSelectedTiles(newSelected);
      
      if (newSelected.length === 3) {
        // Check if all selected tiles are the same color
        const [r1, c1] = newSelected[0].split('-').map(Number);
        const [r2, c2] = newSelected[1].split('-').map(Number);
        const [r3, c3] = newSelected[2].split('-').map(Number);
        
        if (currentPuzzle[r1][c1] === currentPuzzle[r2][c2] && 
            currentPuzzle[r2][c2] === currentPuzzle[r3][c3]) {
          setScore(score + 100);
          // Remove matched tiles
          const newPuzzle = currentPuzzle.map(row => [...row]);
          newSelected.forEach(tile => {
            const [r, c] = tile.split('-').map(Number);
            newPuzzle[r][c] = 'bg-gray-400';
          });
          setCurrentPuzzle(newPuzzle);
        }
        setSelectedTiles([]);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('gameOver');
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎮 Interactive Game Platform</h1>
          <p className="text-gray-400">Multiplayer gaming with real-time features</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              {gameState === 'menu' && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Puzzle Quest</h2>
                  <p className="text-gray-300 mb-6">Match 3 tiles of the same color to score points!</p>
                  <button
                    onClick={startGame}
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all"
                  >
                    Start Game
                  </button>
                </div>
              )}

              {gameState === 'playing' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-white">
                      <span className="font-semibold">Score: {score}</span>
                    </div>
                    <div className="text-white">
                      <span className="font-semibold">Time: {timeLeft}s</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-1 mb-4">
                    {currentPuzzle.map((row, rowIndex) => 
                      row.map((color, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          className={`w-12 h-12 ${color} rounded cursor-pointer transition-all hover:scale-105 ${
                            selectedTiles.includes(`${rowIndex}-${colIndex}`) ? 'ring-2 ring-white ring-opacity-75' : ''
                          }`}
                        />
                      ))
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">Click 3 tiles of the same color to match!</p>
                  </div>
                </div>
              )}

              {gameState === 'gameOver' && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
                  <p className="text-gray-300 mb-4">Final Score: {score}</p>
                  <button
                    onClick={startGame}
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all mr-4"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => setGameState('menu')}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all"
                  >
                    Main Menu
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-4 rounded-lg border border-green-800">
              <h3 className="text-lg font-semibold text-white mb-3">🏆 Global Leaderboard</h3>
              <div className="space-y-2">
                {leaderboard.map((player, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <span className="text-yellow-400 font-bold mr-2">#{player.rank}</span>
                      <span className="text-white">{player.name}</span>
                    </div>
                    <span className="text-green-400 font-semibold">{player.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Players */}
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-4 rounded-lg border border-green-800">
              <h3 className="text-lg font-semibold text-white mb-3">👥 Online Players</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{onlinePlayers}</div>
                <div className="text-gray-300 text-sm">players online</div>
              </div>
            </div>

            {/* Friends */}
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-4 rounded-lg border border-green-800">
              <h3 className="text-lg font-semibold text-white mb-3">👥 Friends</h3>
              <div className="space-y-2">
                {friends.map((friend, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        friend.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></div>
                      <span className="text-white">{friend.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{friend.game}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlatformDemo; 