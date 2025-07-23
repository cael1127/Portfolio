import React, { useState, useEffect } from 'react';

const GamePlatformDemo = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalPlayers: 0,
    activeGames: 0,
    averageLatency: 0,
    serverUptime: 0
  });

  // Initialize game platform data
  useEffect(() => {
    const initialGames = [
      {
        id: 1,
        name: 'Cyber Warriors',
        genre: 'FPS',
        status: 'active',
        players: 1247,
        maxPlayers: 2000,
        averageRating: 4.6,
        lastUpdate: '1 minute ago',
        alerts: [],
        servers: [
          { region: 'US East', players: 456, latency: 45, status: 'active' },
          { region: 'US West', players: 389, latency: 52, status: 'active' },
          { region: 'Europe', players: 402, latency: 78, status: 'active' }
        ],
        leaderboard: [
          { rank: 1, player: 'ShadowKiller', score: 15420, level: 85 },
          { rank: 2, player: 'CyberNinja', score: 14230, level: 78 },
          { rank: 3, player: 'TechWarrior', score: 13890, level: 72 }
        ]
      },
      {
        id: 2,
        name: 'Fantasy Quest',
        genre: 'RPG',
        status: 'active',
        players: 892,
        maxPlayers: 1500,
        averageRating: 4.8,
        lastUpdate: '2 minutes ago',
        alerts: [],
        servers: [
          { region: 'US East', players: 234, latency: 38, status: 'active' },
          { region: 'Europe', players: 345, latency: 65, status: 'active' },
          { region: 'Asia', players: 313, latency: 89, status: 'active' }
        ],
        leaderboard: [
          { rank: 1, player: 'DragonSlayer', score: 8920, level: 92 },
          { rank: 2, player: 'MageMaster', score: 8450, level: 88 },
          { rank: 3, player: 'KnightGuard', score: 8120, level: 85 }
        ]
      },
      {
        id: 3,
        name: 'Racing Legends',
        genre: 'Racing',
        status: 'warning',
        players: 567,
        maxPlayers: 800,
        averageRating: 4.3,
        lastUpdate: 'Just now',
        alerts: ['High server load detected', 'Performance optimization needed'],
        servers: [
          { region: 'US East', players: 189, latency: 42, status: 'active' },
          { region: 'US West', players: 156, latency: 48, status: 'active' },
          { region: 'Europe', players: 222, latency: 72, status: 'warning' }
        ],
        leaderboard: [
          { rank: 1, player: 'SpeedDemon', score: 6780, level: 65 },
          { rank: 2, player: 'TrackMaster', score: 6450, level: 62 },
          { rank: 3, player: 'DriftKing', score: 6120, level: 58 }
        ]
      }
    ];
    setGames(initialGames);
    setSystemStats({
      totalPlayers: initialGames.reduce((sum, game) => sum + game.players, 0),
      activeGames: initialGames.filter(game => game.status === 'active').length,
      averageLatency: 58,
      serverUptime: 99.7
    });
  }, []);

  // Simulate real-time game updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGames(prevGames => {
        const updatedGames = prevGames.map(game => {
          const newGame = {
            ...game,
            players: game.players + Math.floor((Math.random() - 0.5) * 20),
            lastUpdate: 'Just now'
          };

          // Update server data
          newGame.servers = game.servers.map(server => ({
            ...server,
            players: server.players + Math.floor((Math.random() - 0.5) * 10),
            latency: Math.max(20, Math.min(120, server.latency + (Math.random() - 0.5) * 5))
          }));

          // Generate alerts based on conditions
          const newAlerts = [];
          if (newGame.players > game.maxPlayers * 0.9) {
            newAlerts.push('High player count');
          }
          if (newGame.servers.some(s => s.latency > 100)) {
            newAlerts.push('High latency detected');
          }
          if (newGame.servers.some(s => s.players > 200)) {
            newAlerts.push('Server capacity warning');
          }

          newGame.alerts = newAlerts;
          newGame.status = newAlerts.length > 2 ? 'critical' : 
                          newAlerts.length > 0 ? 'warning' : 'active';
          
          return newGame;
        });

        // Update system stats with the new games data
        setSystemStats(prev => ({
          ...prev,
          totalPlayers: updatedGames.reduce((sum, game) => sum + game.players, 0),
          averageLatency: Math.max(20, Math.min(120, prev.averageLatency + (Math.random() - 0.5) * 2))
        }));

        return updatedGames;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate player data
  useEffect(() => {
    const newPlayers = [
      {
        id: 1,
        username: 'ShadowKiller',
        level: 85,
        game: 'Cyber Warriors',
        status: 'online',
        lastSeen: '2 minutes ago',
        achievements: 127,
        playTime: '1,247 hours'
      },
      {
        id: 2,
        username: 'DragonSlayer',
        level: 92,
        game: 'Fantasy Quest',
        status: 'online',
        lastSeen: '1 minute ago',
        achievements: 156,
        playTime: '2,134 hours'
      },
      {
        id: 3,
        username: 'SpeedDemon',
        level: 65,
        game: 'Racing Legends',
        status: 'away',
        lastSeen: '15 minutes ago',
        achievements: 89,
        playTime: '856 hours'
      }
    ];
    setPlayers(newPlayers);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = games.flatMap(game => 
        game.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          game: game.name,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [games]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPlayerStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎮 Interactive Game Platform</h1>
          <p className="text-gray-300 text-lg">
            Multiplayer gaming platform with real-time matchmaking, leaderboards, and performance analytics
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Players</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalPlayers.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Games</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeGames}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Latency</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.averageLatency.toFixed(0)}ms</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🖥️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Server Uptime</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.serverUptime}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Game Management</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all ' + (
                      selectedGame?.id === game.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{game.name}</h3>
                        <p className="text-gray-400 text-sm">{game.genre} • ⭐ {game.averageRating}</p>
                        <p className={'text-sm ' + getStatusColor(game.status)}>
                          {game.status}
                        </p>
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(game.status)}>
                          {game.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(game.status)}>
                          {game.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{game.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Players</p>
                        <p className="text-white font-semibold">
                          {game.players.toLocaleString()}/{game.maxPlayers.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Servers</p>
                        <p className="text-white">{game.servers.length}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Server Capacity</span>
                        <span>{Math.round((game.players / game.maxPlayers) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + (
                            game.players / game.maxPlayers > 0.8 ? 'bg-red-500' : 
                            game.players / game.maxPlayers > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                          )}
                          style={{ width: ((game.players / game.maxPlayers) * 100) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Player Activity & Alerts */}
          <div className="space-y-6">
            {/* Player Activity */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Player Activity</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {players.map((player) => (
                  <div key={player.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{player.username}</p>
                        <p className="text-blue-200 text-sm">Level {player.level} • {player.game}</p>
                        <p className={'text-gray-300 text-xs ' + getPlayerStatusColor(player.status)}>
                          {player.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-300">{player.achievements} achievements</div>
                        <p className="text-gray-300 text-xs mt-1">{player.playTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 System Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.game}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Platform Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Matchmaking
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Server Status
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Performance Monitor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Details */}
        {selectedGame && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedGame.name} Details</h2>
              <button
                onClick={() => setSelectedGame(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Game Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Genre</span>
                    <span className="text-lg font-semibold text-white">{selectedGame.genre}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Players</span>
                    <span className="text-lg font-semibold text-white">
                      {selectedGame.players.toLocaleString()}/{selectedGame.maxPlayers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Rating</span>
                    <span className="text-lg font-semibold text-white">⭐ {selectedGame.averageRating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={'px-2 py-1 rounded text-sm ' + getStatusBg(selectedGame.status)}>
                      {selectedGame.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Server Status</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedGame.servers.map((server, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{server.region}</p>
                          <p className="text-gray-300 text-sm">{server.players} players</p>
                          <p className="text-gray-400 text-xs">{server.latency}ms latency</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          server.status === 'active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
                          {server.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Leaderboard */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">🏆 Leaderboard</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="space-y-2">
                  {selectedGame.leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                      <div className="flex items-center space-x-3">
                        <span className={'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ' + (
                          entry.rank === 1 ? 'bg-yellow-500 text-black' :
                          entry.rank === 2 ? 'bg-gray-400 text-black' :
                          entry.rank === 3 ? 'bg-orange-600 text-white' : 'bg-gray-600 text-white'
                        )}>
                          {entry.rank}
                        </span>
                        <div>
                          <p className="text-white font-semibold">{entry.player}</p>
                          <p className="text-gray-400 text-xs">Level {entry.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{entry.score.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gaming Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced Gaming Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Multiplayer Systems</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time matchmaking</li>
                <li>• Cross-platform play</li>
                <li>• Voice chat integration</li>
                <li>• Team formation</li>
                <li>• Tournament systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Performance Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Server load balancing</li>
                <li>• Latency optimization</li>
                <li>• Player behavior analysis</li>
                <li>• Game balance metrics</li>
                <li>• Anti-cheat systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Social Features</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Friend systems</li>
                <li>• Achievement tracking</li>
                <li>• Leaderboards</li>
                <li>• Guild/clan management</li>
                <li>• In-game messaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlatformDemo; 