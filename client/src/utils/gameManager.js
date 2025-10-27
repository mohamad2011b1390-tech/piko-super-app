// مدیریت بازی‌های درون‌برنامه‌ای
export const gameManager = {
  games: [
    {
      id: '1',
      name: 'دوز',
      icon: '⭕',
      description: 'بازی دوز کلاسیک',
      minPlayers: 2,
      maxPlayers: 2,
      isActive: true
    },
    {
      id: '2', 
      name: 'شطرنج',
      icon: '♟️',
      description: 'بازی شطرنج',
      minPlayers: 2,
      maxPlayers: 2,
      isActive: true
    },
    {
      id: '3',
      name: 'پازل',
      icon: '🧩',
      description: 'پازل تصویری',
      minPlayers: 1,
      maxPlayers: 1,
      isActive: true
    },
    {
      id: '4',
      name: 'کوییز',
      icon: '❓',
      description: 'مسابقه اطلاعات عمومی',
      minPlayers: 1,
      maxPlayers: 100,
      isActive: true
    }
  ],

  // شروع بازی جدید
  startGame(gameId, players) {
    const game = this.games.find(g => g.id === gameId);
    if (!game) {
      throw new Error('بازی یافت نشد');
    }

    if (players.length < game.minPlayers || players.length > game.maxPlayers) {
      throw new Error('تعداد بازیکنان نامعتبر');
    }

    const gameSession = {
      id: `session_${Date.now()}`,
      gameId,
      players,
      status: 'active',
      createdAt: new Date().toISOString(),
      currentTurn: players[0].id,
      moves: []
    };

    return gameSession;
  },

  // انجام حرکت در بازی
  makeMove(sessionId, playerId, move) {
    const session = this.getSession(sessionId);
    if (!session) {
      throw new Error('سشن بازی یافت نشد');
    }

    if (session.currentTurn !== playerId) {
      throw new Error('نوبت شما نیست');
    }

    session.moves.push({
      playerId,
      move,
      timestamp: new Date().toISOString()
    });

    // تعیین نوبت بعدی
    const currentPlayerIndex = session.players.findIndex(p => p.id === playerId);
    const nextPlayerIndex = (currentPlayerIndex + 1) % session.players.length;
    session.currentTurn = session.players[nextPlayerIndex].id;

    // بررسی پایان بازی
    const winner = this.checkWinner(session);
    if (winner) {
      session.status = 'finished';
      session.winner = winner;
    }

    return session;
  },

  // بررسی برنده بازی
  checkWinner(session) {
    // منطق بررسی برنده بر اساس نوع بازی
    // اینجا ساده شده است
    if (session.moves.length >= 5) {
      return session.players[0].id; // برنده فرضی
    }
    return null;
  },

  getSession(sessionId) {
    // در نسخه واقعی از دیتابیس استفاده می‌شود
    return {
      id: sessionId,
      gameId: '1',
      players: [{ id: '1', name: 'Player1' }, { id: '2', name: 'Player2' }],
      status: 'active',
      currentTurn: '1',
      moves: []
    };
  },

  // دریافت امتیازات
  getLeaderboard(gameId) {
    return [
      { rank: 1, playerName: 'علی', score: 1500 },
      { rank: 2, playerName: 'سارا', score: 1450 },
      { rank: 3, playerName: 'رضا', score: 1400 },
      { rank: 4, playerName: 'نازنین', score: 1350 },
      { rank: 5, playerName: 'محمد', score: 1300 }
    ];
  }
};

// مدیریت استوری
export const storyManager = {
  createStory(userId, mediaUrl, type, duration = 24) {
    return {
      id: `story_${Date.now()}`,
      userId,
      mediaUrl,
      type,
      duration,
      views: [],
      reactions: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000).toISOString()
    };
  },

  addView(storyId, userId) {
    // افزودن بیننده به استوری
    console.log(`User ${userId} viewed story ${storyId}`);
  },

  addReaction(storyId, userId, reaction) {
    // افزودن ری‌اکشن به استوری
    console.log(`User ${userId} reacted ${reaction} to story ${storyId}`);
  },

  getExpiredStories() {
    const now = new Date();
    // بازگرداندن استوری‌های منقضی شده
    return [];
  }
};
