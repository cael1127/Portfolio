import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const GamePlatformDemo = () => {
  const [games, setGames] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [gameStats, setGameStats] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [platformStats, setPlatformStats] = useState({
    totalGames: 0,
    activePlayers: 0,
    totalRevenue: 0,
    averageSessionTime: 0,
    serverLoad: 0,
    matchmakingQueue: 0,
    dailyActiveUsers: 0,
    monthlyRevenue: 0
  });

  // Sample code for the demo
  const demoCode = `/**
 * Multiplayer Gaming Platform Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a real-time multiplayer gaming
 * platform with WebSocket connections, matchmaking, and leaderboards.
 */

import React, { useState, useEffect } from 'react';

const GamePlatformDemo = () => {
  const [games, setGames] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [gameStats, setGameStats] = useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGames(prev => prev.map(game => ({
        ...game,
        players: game.players + Math.floor(Math.random() * 10) - 5,
        revenue: game.revenue + Math.random() * 100,
        lastUpdate: 'Just now'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startMatch = (gameId) => {
    const game = games.find(g => g.id === gameId);
    if (game && game.players >= 2) {
      console.log('Starting match for:', game.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game List */}
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{game.name}</h3>
              <p className="text-gray-300 text-sm">{game.players} players online</p>
              <p className="text-gray-400 text-xs">${game.revenue.toFixed(2)} revenue</p>
            </div>
          ))}
        </div>
        
        {/* Active Players */}
        <div className="space-y-4">
          {activePlayers.map((player) => (
            <div key={player.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{player.username}</h3>
              <p className="text-gray-300 text-sm">Playing {player.currentGame}</p>
              <p className="text-gray-400 text-xs">{player.sessionTime} minutes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlatformDemo;`;

  useEffect(() => {
    // Initialize game platform data
    const initialGames = [
      {
        id: 1,
        name: 'Cyber Warriors',
        genre: 'Action RPG',
        players: 1247,
        maxPlayers: 2000,
        revenue: 15420.50,
        rating: 4.8,
        status: 'active',
        lastUpdate: 'Just now',
        features: ['Multiplayer', 'PvP', 'Guilds', 'Trading'],
        serverRegions: ['US-East', 'US-West', 'Europe', 'Asia'],
        matchmakingTime: 12,
        averageSessionTime: 45,
        dailyActiveUsers: 8500,
        monthlyRevenue: 125000
      },
      {
        id: 2,
        name: 'Space Explorers',
        genre: 'Strategy',
        players: 892,
        maxPlayers: 1500,
        revenue: 9875.30,
        rating: 4.6,
        status: 'active',
        lastUpdate: '1 minute ago',
        features: ['Co-op', 'Resource Management', 'Exploration'],
        serverRegions: ['US-East', 'Europe'],
        matchmakingTime: 8,
        averageSessionTime: 32,
        dailyActiveUsers: 6200,
        monthlyRevenue: 89000
      },
      {
        id: 3,
        name: 'Racing Legends',
        genre: 'Racing',
        players: 2156,
        maxPlayers: 3000,
        revenue: 22340.80,
        rating: 4.9,
        status: 'active',
        lastUpdate: '2 minutes ago',
        features: ['Multiplayer Racing', 'Custom Cars', 'Tournaments'],
        serverRegions: ['US-East', 'US-West', 'Europe', 'Asia', 'Australia'],
        matchmakingTime: 5,
        averageSessionTime: 28,
        dailyActiveUsers: 12000,
        monthlyRevenue: 180000
      },
      {
        id: 4,
        name: 'Fantasy Quest',
        genre: 'MMORPG',
        players: 3456,
        maxPlayers: 5000,
        revenue: 45670.20,
        rating: 4.7,
        status: 'maintenance',
        lastUpdate: '3 minutes ago',
        features: ['Open World', 'Guilds', 'Raids', 'Crafting'],
        serverRegions: ['US-East', 'US-West', 'Europe', 'Asia'],
        matchmakingTime: 15,
        averageSessionTime: 120,
        dailyActiveUsers: 25000,
        monthlyRevenue: 320000
      },
      {
        id: 5,
        name: 'Battle Royale',
        genre: 'FPS',
        players: 5678,
        maxPlayers: 8000,
        revenue: 67890.40,
        rating: 4.5,
        status: 'active',
        lastUpdate: '4 minutes ago',
        features: ['Battle Royale', 'Squad Mode', 'Custom Skins'],
        serverRegions: ['US-East', 'US-West', 'Europe', 'Asia', 'South America'],
        matchmakingTime: 3,
        averageSessionTime: 18,
        dailyActiveUsers: 45000,
        monthlyRevenue: 520000
      }
    ];

    const initialActivePlayers = [
      {
        id: 1,
        username: 'DragonSlayer',
        level: 85,
        currentGame: 'Cyber Warriors',
        sessionTime: 127,
        rank: 'Diamond',
        region: 'US-East',
        status: 'in-game',
        achievements: 156,
        playtime: 1247
      },
      {
        id: 2,
        username: 'SpacePilot',
        level: 42,
        currentGame: 'Space Explorers',
        sessionTime: 89,
        rank: 'Gold',
        region: 'Europe',
        status: 'in-game',
        achievements: 89,
        playtime: 567
      },
      {
        id: 3,
        username: 'SpeedDemon',
        level: 67,
        currentGame: 'Racing Legends',
        sessionTime: 45,
        rank: 'Platinum',
        region: 'US-West',
        status: 'in-game',
        achievements: 234,
        playtime: 892
      },
      {
        id: 4,
        username: 'MageMaster',
        level: 128,
        currentGame: 'Fantasy Quest',
        sessionTime: 203,
        rank: 'Legend',
        region: 'Asia',
        status: 'in-game',
        achievements: 445,
        playtime: 2156
      },
      {
        id: 5,
        username: 'SniperElite',
        level: 73,
        currentGame: 'Battle Royale',
        sessionTime: 67,
        rank: 'Master',
        region: 'US-East',
        status: 'in-game',
        achievements: 178,
        playtime: 945
      }
    ];

    const initialLeaderboard = [
      {
        rank: 1,
        username: 'DragonSlayer',
        score: 15420,
        game: 'Cyber Warriors',
        level: 85,
        region: 'US-East'
      },
      {
        rank: 2,
        username: 'MageMaster',
        score: 14230,
        game: 'Fantasy Quest',
        level: 128,
        region: 'Asia'
      },
      {
        rank: 3,
        username: 'SniperElite',
        score: 12890,
        game: 'Battle Royale',
        level: 73,
        region: 'US-East'
      },
      {
        rank: 4,
        username: 'SpeedDemon',
        score: 11560,
        game: 'Racing Legends',
        level: 67,
        region: 'US-West'
      },
      {
        rank: 5,
        username: 'SpacePilot',
        score: 9870,
        game: 'Space Explorers',
        level: 42,
        region: 'Europe'
      }
    ];

    setGames(initialGames);
    setActivePlayers(initialActivePlayers);
    setLeaderboard(initialLeaderboard);
  }, []);

  useEffect(() => {
    // Simulate real-time game platform updates
    const interval = setInterval(() => {
      // Update games
      setGames(prev => prev.map(game => ({
        ...game,
        players: Math.max(0, Math.min(game.maxPlayers, game.players + Math.floor(Math.random() * 20) - 10)),
        revenue: game.revenue + Math.random() * 100,
        lastUpdate: 'Just now'
      })));

      // Update active players
      setActivePlayers(prev => prev.map(player => ({
        ...player,
        sessionTime: player.sessionTime + 1,
        level: player.level + (Math.random() > 0.95 ? 1 : 0)
      })));

      // Update platform stats
      setPlatformStats(prev => ({
        totalGames: games.length,
        activePlayers: activePlayers.length,
        totalRevenue: games.reduce((sum, game) => sum + game.revenue, 0),
        averageSessionTime: Math.floor(activePlayers.reduce((sum, player) => sum + player.sessionTime, 0) / activePlayers.length),
        serverLoad: Math.max(20, Math.min(95, prev.serverLoad + (Math.random() - 0.5) * 10)),
        matchmakingQueue: Math.floor(Math.random() * 500) + 100,
        dailyActiveUsers: Math.floor(Math.random() * 10000) + 50000,
        monthlyRevenue: prev.monthlyRevenue + Math.random() * 1000
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [games, activePlayers]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'maintenance': return 'bg-yellow-600';
      case 'offline': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Legend': return 'text-purple-400';
      case 'Master': return 'text-red-400';
      case 'Diamond': return 'text-blue-400';
      case 'Platinum': return 'text-cyan-400';
      case 'Gold': return 'text-yellow-400';
      case 'Silver': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 'Legend': return 'bg-purple-600';
      case 'Master': return 'bg-red-600';
      case 'Diamond': return 'bg-blue-600';
      case 'Platinum': return 'bg-cyan-600';
      case 'Gold': return 'bg-yellow-600';
      case 'Silver': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-purple-400 mb-4">🎮 Advanced Game Platform</h1>
            <p className="text-gray-300 text-lg">
              Multiplayer gaming platform with real-time analytics, matchmaking, and comprehensive game management
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* Platform Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Games</h3>
            <p className="text-3xl font-bold text-purple-400">{platformStats.totalGames}</p>
            <p className="text-purple-300 text-sm">{platformStats.activePlayers} players online</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-blue-400">{formatCurrency(platformStats.totalRevenue)}</p>
            <p className="text-blue-300 text-sm">{formatCurrency(platformStats.monthlyRevenue)} monthly</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Server Load</h3>
            <p className="text-3xl font-bold text-green-400">{platformStats.serverLoad.toFixed(1)}%</p>
            <p className="text-green-300 text-sm">{platformStats.matchmakingQueue} in queue</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Daily Users</h3>
            <p className="text-3xl font-bold text-yellow-400">{formatNumber(platformStats.dailyActiveUsers)}</p>
            <p className="text-yellow-300 text-sm">{platformStats.averageSessionTime} min avg session</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🎮 Game Management</h2>
                <div className="text-sm text-purple-300">Real-time updates every 3s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      selectedGame?.id === game.id
                        ? 'border-purple-400 bg-purple-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{game.name}</h3>
                        <p className="text-purple-200 text-sm">{game.genre}</p>
                        <p className="text-purple-200 text-xs">⭐ {game.rating} • {game.features.join(', ')}</p>
                        <p className="text-gray-300 text-xs">{game.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(game.status)}>
                          {game.status.toUpperCase()}
                        </div>
                        <p className="text-white text-lg font-semibold mt-1">{game.players}/{game.maxPlayers}</p>
                        <p className="text-gray-300 text-xs">{formatCurrency(game.revenue)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Matchmaking</p>
                        <p className="text-white font-semibold">{game.matchmakingTime}s</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Session Time</p>
                        <p className="text-white font-semibold">{game.averageSessionTime}m</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Daily Users</p>
                        <p className="text-white font-semibold">{formatNumber(game.dailyActiveUsers)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Server Load</span>
                        <span>{Math.floor((game.players / game.maxPlayers) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            game.players / game.maxPlayers > 0.8 ? 'bg-red-500' : 
                            game.players / game.maxPlayers > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                          )}
                          style={{ width: Math.min((game.players / game.maxPlayers) * 100, 100) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gaming Analytics */}
          <div className="space-y-6">
            {/* Active Players */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Active Players</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {activePlayers.map((player) => (
                  <div key={player.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{player.username}</p>
                        <p className="text-blue-200 text-sm">Level {player.level} • {player.currentGame}</p>
                        <p className="text-blue-200 text-xs">{player.sessionTime}m session</p>
                        <p className="text-gray-300 text-xs">{player.region}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getRankBg(player.rank)}>
                          {player.rank}
                        </div>
                        <p className="text-white text-xs mt-1">{player.achievements} achievements</p>
                        <p className="text-gray-300 text-xs">{player.playtime}h total</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">🏆 Leaderboard</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {leaderboard.map((player) => (
                  <div key={player.rank} className="bg-yellow-800/50 p-3 rounded-lg border border-yellow-600">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className={'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ' + (
                          player.rank === 1 ? 'bg-yellow-500' :
                          player.rank === 2 ? 'bg-gray-400' :
                          player.rank === 3 ? 'bg-orange-600' : 'bg-gray-600'
                        )}>
                          {player.rank}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{player.username}</p>
                          <p className="text-yellow-200 text-sm">{player.game}</p>
                          <p className="text-yellow-200 text-xs">Level {player.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{formatNumber(player.score)}</p>
                        <p className="text-gray-300 text-xs">{player.region}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Server Status */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-4">🖥️ Server Status</h2>
              <div className="space-y-3">
                <div className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">US-East</p>
                      <p className="text-green-200 text-sm">Primary Server</p>
                    </div>
                    <div className="text-right">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-green-300 text-xs">Online</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Europe</p>
                      <p className="text-green-200 text-sm">Secondary Server</p>
                    </div>
                    <div className="text-right">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-green-300 text-xs">Online</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Asia</p>
                      <p className="text-green-200 text-sm">Regional Server</p>
                    </div>
                    <div className="text-right">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-green-300 text-xs">Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Details Modal */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Game Details</h2>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Game Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-semibold">{selectedGame.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Genre:</span>
                      <span className="text-white font-semibold">{selectedGame.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={'font-semibold ' + getStatusColor(selectedGame.status)}>
                        {selectedGame.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-white font-semibold">⭐ {selectedGame.rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Players:</span>
                      <span className="text-white font-semibold">{selectedGame.players}/{selectedGame.maxPlayers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-white font-semibold">{formatCurrency(selectedGame.revenue)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Performance Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Matchmaking Time:</span>
                      <span className="text-white font-semibold">{selectedGame.matchmakingTime}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Session:</span>
                      <span className="text-white font-semibold">{selectedGame.averageSessionTime}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily Users:</span>
                      <span className="text-white font-semibold">{formatNumber(selectedGame.dailyActiveUsers)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Revenue:</span>
                      <span className="text-white font-semibold">{formatCurrency(selectedGame.monthlyRevenue)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-green-400 mb-3 mt-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3 mt-4">Server Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.serverRegions.map((region, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gaming Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🎮 Advanced Gaming Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Multiplayer System</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time matchmaking</li>
                <li>• Cross-platform play</li>
                <li>• Server load balancing</li>
                <li>• Regional servers</li>
                <li>• Anti-cheat protection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Game Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Player behavior tracking</li>
                <li>• Performance metrics</li>
                <li>• Revenue analytics</li>
                <li>• Server monitoring</li>
                <li>• Real-time dashboards</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Social Features</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Friend system</li>
                <li>• Guilds & clans</li>
                <li>• Leaderboards</li>
                <li>• Achievements</li>
                <li>• Chat system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Game Platform Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default GamePlatformDemo; 