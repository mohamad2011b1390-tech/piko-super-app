const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ==================== دیتابیس پیشرفته ====================
const dbPath = path.join(__dirname, 'piko-super-db.json');

const db = {
  read: () => {
    try {
      if (fs.existsSync(dbPath)) {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      }
    } catch (error) {}
    return { 
      users: [], messages: [], groups: [], channels: [], 
      calls: [], bots: [], stories: [], games: [], files: [] 
    };
  },
  
  save: (data) => {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      return false;
    }
  }
};

// ==================== میدلورها ====================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'توکن required' });
  jwt.verify(token, 'piko-super-secret-2024', (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'توکن نامعتبر' });
    req.user = user;
    next();
  });
};

// ==================== روت‌های اصلی ====================
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 سوپر پیکو فعال!', 
    version: '2.0.0',
    features: ['چت', 'تماس', 'ربات', 'گروه', 'کانال', 'استوری', 'بازی', 'فضای ابری', 'چت مخفی'],
    database: 'JSON'
  });
});

// ==================== احراز هویت پیشرفته ====================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { phone, username, password, name } = req.body;
    if (!phone || !username || !password) {
      return res.json({ success: false, message: 'شماره، نام کاربری و رمز الزامی است' });
    }

    const dbData = db.read();
    const existingUser = dbData.users.find(u => u.phone === phone || u.username === username);
    if (existingUser) {
      return res.json({ success: false, message: 'شماره یا نام کاربری قبلاً ثبت شده' });
    }

    const newUser = {
      id: uuidv4(),
      phone,
      username: username.toLowerCase(),
      password: await bcrypt.hash(password, 12),
      profile: {
        name: name || username,
        bio: 'به سوپر پیکو خوش آمدید! 🚀',
        avatar: '',
        lastSeen: new Date().toISOString(),
        isOnline: true
      },
      contacts: [], groups: [], channels: [],
      settings: { 
        theme: 'light', notifications: true, privacy: 'public',
        secretChats: true, storyExpiry: 24
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbData.users.push(newUser);
    db.save(dbData);

    const token = jwt.sign({ userId: newUser.id, username: newUser.username }, 'piko-super-secret-2024', { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'حساب کاربری با موفقیت ساخته شد',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        profile: newUser.profile
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'خطای سرور در ثبت‌نام' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.json({ success: false, message: 'شماره و رمز الزامی است' });
    }

    const dbData = db.read();
    const user = dbData.users.find(u => u.phone === phone);
    if (!user) {
      return res.json({ success: false, message: 'شماره تلفن یافت نشد' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: 'رمز عبور اشتباه است' });
    }

    user.profile.isOnline = true;
    user.profile.lastSeen = new Date().toISOString();
    db.save(dbData);

    const token = jwt.sign({ userId: user.id, username: user.username }, 'piko-super-secret-2024', { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'ورود موفق',
      token,
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'خطای سرور در ورود' });
  }
});

// ==================== چت پیشرفته ====================
app.post('/api/messages/send', authenticateToken, (req, res) => {
  try {
    const { receiverId, content, type = 'text', isSecret = false, selfDestruct = 0 } = req.body;
    const senderId = req.user.userId;

    if (!receiverId || !content) {
      return res.json({ success: false, message: 'گیرنده و محتوا الزامی است' });
    }

    const dbData = db.read();
    const receiver = dbData.users.find(u => u.id === receiverId);
    if (!receiver) {
      return res.json({ success: false, message: 'گیرنده یافت نشد' });
    }

    const newMessage = {
      id: uuidv4(),
      senderId,
      receiverId,
      content,
      type,
      isSecret,
      selfDestruct,
      timestamp: new Date().toISOString(),
      read: false,
      status: 'sent'
    };

    dbData.messages.push(newMessage);
    db.save(dbData);

    io.emit('newMessage', newMessage);

    res.json({
      success: true,
      message: 'پیام ارسال شد',
      messageId: newMessage.id
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'خطا در ارسال پیام' });
  }
});

// ==================== گروه‌های پیشرفته ====================
app.post('/api/groups/create', authenticateToken, (req, res) => {
  try {
    const { name, description, members = [], isChannel = false } = req.body;
    const creatorId = req.user.userId;

    if (!name) {
      return res.json({ success: false, message: 'نام گروه الزامی است' });
    }

    const dbData = db.read();
    
    const newGroup = {
      id: uuidv4(),
      name,
      description: description || '',
      creatorId,
      admins: [creatorId],
      members: [creatorId, ...members],
      isChannel,
      avatar: '',
      settings: { 
        isPublic: false, 
        inviteLink: uuidv4(),
        slowMode: false,
        adminPermissions: {
          deleteMessages: true,
          banUsers: true,
          pinMessages: true,
          addAdmins: true
        }
      },
      stats: {
        membersCount: 1 + members.length,
        messagesCount: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbData.groups.push(newGroup);
    db.save(dbData);

    res.json({
      success: true,
      message: isChannel ? 'کانال ایجاد شد' : 'گروه ایجاد شد',
      group: newGroup
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'خطا در ایجاد گروه' });
  }
});

// ==================== استوری (Rubox) ====================
app.post('/api/stories/create', authenticateToken, (req, res) => {
  try {
    const { mediaUrl, type, duration = 24 } = req.body;
    const userId = req.user.userId;

    const dbData = db.read();
    
    const newStory = {
      id: uuidv4(),
      userId,
      mediaUrl,
      type,
      duration,
      views: [],
      reactions: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000).toISOString()
    };

    dbData.stories.push(newStory);
    db.save(dbData);

    res.json({
      success: true,
      message: 'استوری منتشر شد',
      story: newStory
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'خطا در ایجاد استوری' });
  }
});

// ==================== ربات‌ها (BotFather) ====================
app.post('/api/bots/create', authenticateToken, (req, res) => {
  try {
    const { name, username, description } = req.body;
    const creatorId = req.user.userId;

    const dbData = db.read();
    
    const newBot = {
      id: uuidv4(),
      name,
      username: `@${username}`,
      description,
      creatorId,
      token: uuidv4(),
      commands: [],
      webhook: '',
      isActive: true,
      stats: { messagesProcessed: 0, users: 0 },
      createdAt: new Date().toISOString()
    };

    dbData.bots.push(newBot);
    db.save(dbData);

    res.json({
      success: true,
      message: 'ربات ایجاد شد',
      bot: newBot
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'خطا در ایجاد ربات' });
  }
});

// ==================== WebSocket پیشرفته ====================
io.on('connection', (socket) => {
  console.log('✅ کاربر متصل شد:', socket.id);

  socket.on('joinUser', (userId) => {
    socket.join(userId);
    console.log(`👤 کاربر ${userId} به اتاق پیوست`);
  });

  socket.on('sendMessage', (messageData) => {
    const { senderId, receiverId, content, type, isSecret, selfDestruct } = messageData;
    
    const dbData = db.read();
    
    const newMessage = {
      id: uuidv4(),
      senderId,
      receiverId,
      content,
      type,
      isSecret,
      selfDestruct,
      timestamp: new Date().toISOString(),
      read: false,
      status: 'delivered'
    };

    dbData.messages.push(newMessage);
    db.save(dbData);

    // ارسال به گیرنده
    socket.to(receiverId).emit('newMessage', newMessage);
    socket.emit('messageSent', { tempId: messageData.tempId, message: newMessage });

    console.log(`📨 پیام از ${senderId} به ${receiverId}`);
  });

  socket.on('startCall', (callData) => {
    const { receiverId, type } = callData;
    socket.to(receiverId).emit('incomingCall', {
      callId: uuidv4(),
      callerId: callData.callerId,
      type,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('typing', (data) => {
    socket.to(data.receiverId).emit('userTyping', {
      senderId: data.senderId,
      isTyping: data.isTyping
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ کاربر قطع شد:', socket.id);
  });
});

// ==================== راه‌اندازی سرور ====================
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 ==========================================`);
  console.log(`🦸 سوپر پیکو اجرا شد!`);
  console.log(`📍 آدرس: http://localhost:${PORT}`);
  console.log(`💾 دیتابیس: ${dbPath}`);
  console.log(`⚡ WebSocket: فعال`);
  console.log(`🎮 ویژگی‌ها: چت مخفی، استوری، ربات، تماس`);
  console.log(`==========================================\n`);
});

