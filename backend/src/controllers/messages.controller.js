import { INITIAL_CONVERSATIONS } from '../data/mockStore.js';

let conversations = [...INITIAL_CONVERSATIONS];

export const getConversations = (req, res) => {
  res.json({
    success: true,
    count: conversations.length,
    data: conversations
  });
};

export const getConversationById = (req, res) => {
  const conv = conversations.find(c => c.id === req.params.id);
  if (!conv) {
    return res.status(404).json({ success: false, message: 'Conversation not found' });
  }

  // Mark conversation read
  conv.unread = false;

  res.json({
    success: true,
    data: conv
  });
};

export const sendMessage = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Message text is required' });
  }

  const conv = conversations.find(c => c.id === id);
  if (!conv) {
    return res.status(404).json({ success: false, message: 'Conversation not found' });
  }

  const newMsg = {
    id: `m-${Date.now()}`,
    sender: 'me',
    text: text.trim(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  conv.messages.push(newMsg);
  conv.lastMessage = newMsg.text;
  conv.lastTimestamp = newMsg.timestamp;

  res.status(201).json({
    success: true,
    message: 'Message sent',
    data: newMsg
  });
};

export const createConversation = (req, res) => {
  const { recipientName, recipientAvatar, itemTitle } = req.body;

  const newConv = {
    id: `conv-${Date.now()}`,
    recipient: {
      name: recipientName || 'Community Member',
      avatar: recipientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      itemTitle: itemTitle || 'General Inquiry',
      verified: true
    },
    unread: false,
    lastMessage: 'Conversation started',
    lastTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    messages: [
      {
        id: `m-${Date.now()}`,
        sender: 'me',
        text: `Hi! I'm interested in renting "${itemTitle || 'this item'}". Is it available?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  conversations.unshift(newConv);

  res.status(201).json({
    success: true,
    data: newConv
  });
};

