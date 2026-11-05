import { INITIAL_USER } from '../data/mockStore.js';

let currentUser = { ...INITIAL_USER };

export const getCurrentUser = (req, res) => {
  res.json({
    success: true,
    data: currentUser
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide email or phone' });
  }

  // Demo user authentication
  res.json({
    success: true,
    message: 'Welcome back to Lendit!',
    token: `demo-jwt-token-${Date.now()}`,
    data: currentUser
  });
};

export const registerUser = (req, res) => {
  const { name, email, phone, location } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Please provide name and email' });
  }

  currentUser = {
    ...currentUser,
    name,
    email,
    phone: phone || currentUser.phone,
    location: location || currentUser.location,
    memberSince: 'Today'
  };

  res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to Lendit.',
    token: `demo-jwt-token-${Date.now()}`,
    data: currentUser
  });
};

export const updateProfile = (req, res) => {
  currentUser = {
    ...currentUser,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: currentUser
  });
};

