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

  // Deterministic Game Platform Implementation
  const gamePlatformSystem = {
    // Deterministic matchmaking algorithm
    matchmaking: (players, gameMode, skillLevel) => {
      if (players.length < 2) return null;
      
      // Sort players by skill level for balanced matches
      const sortedPlayers = [...players].sort((a, b) => a.skillLevel - b.skillLevel);
      
      // Create balanced teams
      const teams = [];
      const teamSize = gameMode === 'solo' ? 1 : gameMode === 'duo' ? 2 : 4;
      
      for (let i = 0; i < sortedPlayers.length; i += teamSize * 2) {
        const team1 = sortedPlayers.slice(i, i + teamSize);
        const team2 = sortedPlayers.slice(i + teamSize, i + teamSize * 2);
        
        if (team1.length === teamSize && team2.length === teamSize) {
          teams.push({
            id: teams.length + 1,
            team1,
            team2,
            skillDifference: Math.abs(
              team1.reduce((sum, p) => sum + p.skillLevel, 0) / team1.length -
              team2.reduce((sum, p) => sum + p.skillLevel, 0) / team2.length
            ),
            timestamp: new Date().toISOString()
          });
        }
      }
      
      return teams;
    },

    // Deterministic skill rating calculation
    calculateSkillRating: (player, matchResult, opponentSkill) => {
      const kFactor = player.matches < 30 ? 40 : player.matches < 100 ? 20 : 10;
      const expectedScore = 1 / (1 + Math.pow(10, (opponentSkill - player.skillLevel) / 400));
      const actualScore = matchResult === 'win' ? 1 : matchResult === 'draw' ? 0.5 : 0;
      
      const newRating = player.skillLevel + kFactor * (actualScore - expectedScore);
      return Math.max(0, Math.round(newRating));
    },

    // Deterministic leaderboard ranking
    calculateLeaderboard: (players) => {
      return players
        .map(player => ({
          ...player,
          score: player.skillLevel * 10 + player.wins * 100 + player.totalKills * 5
        }))
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({
          ...player,
          rank: index + 1,
          tier: this.getTier(player.score)
        }));
    },

    // Determine player tier based on score
    getTier: (score) => {
      if (score >= 5000) return 'Legendary';
      if (score >= 4000) return 'Master';
      if (score >= 3000) return 'Diamond';
      if (score >= 2000) return 'Platinum';
      if (score >= 1000) return 'Gold';
      if (score >= 500) return 'Silver';
      return 'Bronze';
    },

    // Deterministic game balance algorithm
    balanceGame: (game, players) => {
      const totalPlayers = players.length;
      const targetTeams = Math.floor(totalPlayers / 4); // 4 players per team
      
      // Calculate average skill per team
      const sortedPlayers = [...players].sort((a, b) => a.skillLevel - b.skillLevel);
      const teams = [];
      
      for (let i = 0; i < targetTeams; i++) {
        const team = [];
        for (let j = 0; j < 4; j++) {
          const playerIndex = i + (j * targetTeams);
          if (playerIndex < sortedPlayers.length) {
            team.push(sortedPlayers[playerIndex]);
          }
        }
        if (team.length === 4) {
          teams.push({
            id: i + 1,
            players: team,
            averageSkill: team.reduce((sum, p) => sum + p.skillLevel, 0) / team.length,
            totalKills: team.reduce((sum, p) => sum + p.totalKills, 0)
          });
        }
      }
      
      return teams;
    },

    // Deterministic revenue calculation
    calculateRevenue: (game, players, timeSpent) => {
      const baseRevenue = game.basePrice || 0;
      const playerRevenue = players * (game.pricePerPlayer || 0);
      const timeRevenue = timeSpent * (game.pricePerMinute || 0);
      const premiumRevenue = players * (game.premiumFeatures || 0);
      
      return baseRevenue + playerRevenue + timeRevenue + premiumRevenue;
    },

    // Deterministic server load calculation
    calculateServerLoad: (games, players) => {
      const totalConnections = players.length;
      const activeGames = games.filter(g => g.status === 'active').length;
      const maxCapacity = 10000; // Simplified server capacity
      
      const loadPercentage = Math.min(100, (totalConnections / maxCapacity) * 100);
      const serverHealth = loadPercentage < 70 ? 'Healthy' : loadPercentage < 90 ? 'Moderate' : 'Critical';
      
      return {
        loadPercentage: Math.round(loadPercentage),
        serverHealth,
        activeConnections: totalConnections,
        activeGames,
        capacity: maxCapacity
      };
    },

    // Deterministic matchmaking queue management
    manageQueue: (queue, gameMode) => {
      const minPlayers = gameMode === 'solo' ? 2 : gameMode === 'duo' ? 4 : 8;
      const maxWaitTime = 300; // 5 minutes
      
      // Filter players who have been waiting too long
      const currentTime = Date.now();
      const validPlayers = queue.filter(player => 
        (currentTime - new Date(player.joinTime).getTime()) < maxWaitTime * 1000
      );
      
      // Group players by skill level for balanced matchmaking
      const skillGroups = {};
      validPlayers.forEach(player => {
        const skillGroup = Math.floor(player.skillLevel / 100) * 100;
        if (!skillGroups[skillGroup]) skillGroups[skillGroup] = [];
        skillGroups[skillGroup].push(player);
      });
      
      // Create matches within skill groups
      const matches = [];
      Object.values(skillGroups).forEach(group => {
        if (group.length >= minPlayers) {
          const match = this.matchmaking(group, gameMode);
          if (match) {
            matches.push(...match);
          }
        }
      });
      
      return {
        queueLength: validPlayers.length,
        matchesCreated: matches.length,
        averageWaitTime: validPlayers.reduce((sum, p) => 
          sum + (currentTime - new Date(p.joinTime).getTime()) / 1000, 0) / validPlayers.length || 0
      };
    }
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const baseTime = Date.now();
    
    // Generate games
    const gameTypes = ['Action RPG', 'FPS', 'Strategy', 'Sports', 'Racing'];
    const gameNames = ['Cyber Warriors', 'Neon Strike', 'Empire Builder', 'Champion League', 'Speed Demon'];
    
    const games = gameNames.map((name, index) => {
      const basePrice = 10 + (index * 5);
      const pricePerPlayer = 2 + (index % 3);
      const pricePerMinute = 0.1 + (index * 0.05);
      const premiumFeatures = index % 2 === 0 ? 5 : 0;
      
      return {
        id: index + 1,
        name,
        genre: gameTypes[index % gameTypes.length],
        players: 500 + (index * 200) + Math.floor(Math.sin(index * 0.5) * 100),
        maxPlayers: 1000 + (index * 500),
        revenue: basePrice + (index * 1000) + Math.floor(Math.cos(index * 0.3) * 500),
        rating: 4.0 + (index * 0.2) + Math.sin(index * 0.7) * 0.3,
        status: 'active',
        basePrice,
        pricePerPlayer,
        pricePerMinute,
        premiumFeatures,
        lastUpdate: new Date(baseTime - (index * 60000)).toISOString()
      };
    });
    
    // Generate players
    const playerNames = [
      'ShadowHunter', 'NeonBlade', 'CyberQueen', 'DigitalKing', 'PixelWarrior',
      'QuantumPlayer', 'VoidRunner', 'EchoStriker', 'FrostByte', 'ThunderCore'
    ];
    
    const activePlayers = playerNames.map((username, index) => {
      const skillLevel = 800 + (index * 100) + Math.floor(Math.sin(index * 0.4) * 50);
      const wins = 50 + (index * 10) + Math.floor(Math.cos(index * 0.6) * 20);
      const losses = 30 + (index * 8) + Math.floor(Math.sin(index * 0.8) * 15);
      const totalKills = 200 + (index * 25) + Math.floor(Math.cos(index * 0.3) * 50);
      
      return {
        id: index + 1,
        username,
        skillLevel: Math.max(0, Math.min(2000, skillLevel)),
        wins,
        losses,
        totalKills,
        matches: wins + losses,
        currentGame: games[index % games.length].name,
        sessionTime: 15 + (index * 5) + Math.floor(Math.sin(index * 0.5) * 10),
        joinTime: new Date(baseTime - (index * 300000)).toISOString(),
        status: 'online'
      };
    });
    
    // Generate game stats
    const gameStats = {};
    games.forEach(game => {
      const players = activePlayers.filter(p => p.currentGame === game.name);
      const timeSpent = players.reduce((sum, p) => sum + p.sessionTime, 0);
      
      gameStats[game.id] = {
        totalPlayers: players.length,
        averageSkill: players.length > 0 ? 
          players.reduce((sum, p) => sum + p.skillLevel, 0) / players.length : 0,
        totalKills: players.reduce((sum, p) => sum + p.totalKills, 0),
        totalWins: players.reduce((sum, p) => sum + p.wins, 0),
        revenue: gamePlatformSystem.calculateRevenue(game, players.length, timeSpent),
        serverLoad: Math.min(100, (players.length / game.maxPlayers) * 100)
      };
    });
    
    // Generate leaderboard
    const leaderboard = gamePlatformSystem.calculateLeaderboard(activePlayers);
    
    // Calculate platform stats
    const totalGames = games.length;
    const totalPlayers = activePlayers.length;
    const totalRevenue = games.reduce((sum, game) => sum + game.revenue, 0);
    const averageSessionTime = activePlayers.reduce((sum, player) => sum + player.sessionTime, 0) / totalPlayers;
    const serverLoad = gamePlatformSystem.calculateServerLoad(games, activePlayers);
    const matchmakingQueue = Math.floor(totalPlayers * 0.3); // 30% in queue
    const dailyActiveUsers = Math.floor(totalPlayers * 1.5); // 50% more than current
    const monthlyRevenue = totalRevenue * 30; // 30 days
    
    setGames(games);
    setActivePlayers(activePlayers);
    setGameStats(gameStats);
    setLeaderboard(leaderboard);
    setPlatformStats({
      totalGames,
      activePlayers: totalPlayers,
      totalRevenue,
      averageSessionTime: Math.round(averageSessionTime),
      serverLoad: serverLoad.loadPercentage,
      matchmakingQueue,
      dailyActiveUsers,
      monthlyRevenue
    });
    
    return { games, activePlayers, gameStats, leaderboard, platformStats };
  };

  // Run game platform algorithms
  const runGamePlatformAlgorithms = (data) => {
    const { games, activePlayers } = data;
    
    // Run matchmaking for different game modes
    const matchmakingResults = {
      solo: gamePlatformSystem.matchmaking(activePlayers, 'solo'),
      duo: gamePlatformSystem.matchmaking(activePlayers, 'duo'),
      squad: gamePlatformSystem.matchmaking(activePlayers, 'squad')
    };
    
    // Balance games
    const balancedGames = games.map(game => {
      const gamePlayers = activePlayers.filter(p => p.currentGame === game.name);
      const balancedTeams = gamePlatformSystem.balanceGame(game, gamePlayers);
      return { ...game, balancedTeams };
    });
    
    // Manage matchmaking queue
    const queueManagement = gamePlatformSystem.manageQueue(activePlayers, 'squad');
    
    // Update games with new data
    setGames(balancedGames);
    
    return { matchmakingResults, balancedGames, queueManagement };
  };

  // Initialize demo
  useEffect(() => {
    const sampleData = generateSampleData();
    const results = runGamePlatformAlgorithms(sampleData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">🎮 Multiplayer Gaming Platform</h1>
          <p className="text-gray-300 text-lg">
            Advanced gaming platform with deterministic matchmaking, skill rating, and game balance algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{platformStats.totalGames}</div>
                  <div className="text-sm text-gray-400">Total Games</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{platformStats.activePlayers}</div>
                  <div className="text-sm text-gray-400">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">${platformStats.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{platformStats.serverLoad}%</div>
                  <div className="text-sm text-gray-400">Server Load</div>
                </div>
              </div>
            </div>

            {/* Games List */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Active Games</h2>
              <div className="space-y-4">
                {games.map(game => (
                  <div key={game.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">{game.name}</div>
                        <div className="text-sm text-gray-300">{game.genre}</div>
                        <div className="text-xs text-gray-400">
                          Players: {game.players}/{game.maxPlayers} | Rating: {game.rating.toFixed(1)}⭐
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400">${game.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">
                          Server Load: {gameStats[game.id]?.serverLoad || 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((player, index) => (
                  <div key={player.id} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-amber-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{player.username}</div>
                          <div className="text-xs text-gray-400">{player.tier}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-blue-400">{player.score} pts</div>
                        <div className="text-xs text-gray-400">
                          {player.wins}W/{player.losses}L | {player.totalKills} kills
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Players */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Active Players</h3>
              <div className="space-y-3">
                {activePlayers.slice(0, 8).map(player => (
                  <div key={player.id} className="bg-gray-700 p-3 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{player.username}</div>
                        <div className="text-gray-400">{player.currentGame}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400">{player.skillLevel}</div>
                        <div className="text-xs text-gray-400">{player.sessionTime}m</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matchmaking Queue */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Matchmaking Queue</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Queue Length:</span>
                  <span className="text-blue-400">{platformStats.matchmakingQueue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Active:</span>
                  <span className="text-green-400">{platformStats.dailyActiveUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue:</span>
                  <span className="text-yellow-400">${platformStats.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Session:</span>
                  <span className="text-purple-400">{platformStats.averageSessionTime}m</span>
                </div>
              </div>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Game Platform Implementation"
          code={`
// Deterministic Game Platform Implementation
class GamePlatformSystem {
  // Deterministic matchmaking algorithm
  matchmaking(players, gameMode, skillLevel) {
    if (players.length < 2) return null;
    
    // Sort players by skill level for balanced matches
    const sortedPlayers = [...players].sort((a, b) => a.skillLevel - b.skillLevel);
    
    // Create balanced teams
    const teams = [];
    const teamSize = gameMode === 'solo' ? 1 : gameMode === 'duo' ? 2 : 4;
    
    for (let i = 0; i < sortedPlayers.length; i += teamSize * 2) {
      const team1 = sortedPlayers.slice(i, i + teamSize);
      const team2 = sortedPlayers.slice(i + teamSize, i + teamSize * 2);
      
      if (team1.length === teamSize && team2.length === teamSize) {
        teams.push({
          id: teams.length + 1,
          team1,
          team2,
          skillDifference: Math.abs(
            team1.reduce((sum, p) => sum + p.skillLevel, 0) / team1.length -
            team2.reduce((sum, p) => sum + p.skillLevel, 0) / team2.length
          ),
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return teams;
  }

  // Deterministic skill rating calculation
  calculateSkillRating(player, matchResult, opponentSkill) {
    const kFactor = player.matches < 30 ? 40 : player.matches < 100 ? 20 : 10;
    const expectedScore = 1 / (1 + Math.pow(10, (opponentSkill - player.skillLevel) / 400));
    const actualScore = matchResult === 'win' ? 1 : matchResult === 'draw' ? 0.5 : 0;
    
    const newRating = player.skillLevel + kFactor * (actualScore - expectedScore);
    return Math.max(0, Math.round(newRating));
  }

  // Deterministic leaderboard ranking
  calculateLeaderboard(players) {
    return players
      .map(player => ({
        ...player,
        score: player.skillLevel * 10 + player.wins * 100 + player.totalKills * 5
      }))
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        tier: this.getTier(player.score)
      }));
  }

  // Determine player tier based on score
  getTier(score) {
    if (score >= 5000) return 'Legendary';
    if (score >= 4000) return 'Master';
    if (score >= 3000) return 'Diamond';
    if (score >= 2000) return 'Platinum';
    if (score >= 1000) return 'Gold';
    if (score >= 500) return 'Silver';
    return 'Bronze';
  }

  // Deterministic game balance algorithm
  balanceGame(game, players) {
    const totalPlayers = players.length;
    const targetTeams = Math.floor(totalPlayers / 4); // 4 players per team
    
    // Calculate average skill per team
    const sortedPlayers = [...players].sort((a, b) => a.skillLevel - b.skillLevel);
    const teams = [];
    
    for (let i = 0; i < targetTeams; i++) {
      const team = [];
      for (let j = 0; j < 4; j++) {
        const playerIndex = i + (j * targetTeams);
        if (playerIndex < sortedPlayers.length) {
          team.push(sortedPlayers[playerIndex]);
        }
      }
      if (team.length === 4) {
        teams.push({
          id: i + 1,
          players: team,
          averageSkill: team.reduce((sum, p) => sum + p.skillLevel, 0) / team.length,
          totalKills: team.reduce((sum, p) => sum + p.totalKills, 0)
        });
      }
    }
    
    return teams;
  }
}
          `}
        />
      )}
    </div>
  );
};

export default GamePlatformDemo; 