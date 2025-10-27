const BASE_URL = 'https://piko-server.onrender.com';

export const api = {
  // User APIs
  login: async (username, password) => {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Chat APIs
  getChats: async (userId) => {
    const response = await fetch(`${BASE_URL}/api/chats/${userId}`);
    return response.json();
  },

  sendMessage: async (messageData) => {
    const response = await fetch(`${BASE_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return response.json();
  },

  // Group APIs
  createGroup: async (groupData) => {
    const response = await fetch(`${BASE_URL}/api/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupData)
    });
    return response.json();
  },

  // Call APIs
  startCall: async (callData) => {
    const response = await fetch(`${BASE_URL}/api/calls/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(callData)
    });
    return response.json();
  },

  // Story APIs
  uploadStory: async (storyData) => {
    const response = await fetch(`${BASE_URL}/api/stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storyData)
    });
    return response.json();
  },

  // Bot APIs
  getBots: async () => {
    const response = await fetch(`${BASE_URL}/api/bots`);
    return response.json();
  },

  // Game APIs
  startGame: async (gameData) => {
    const response = await fetch(`${BASE_URL}/api/games/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });
    return response.json();
  }
};
