const express = require('express');
require('dotenv').config();
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post(
  '/createuser',
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Error creating user' });
    }
  }
);

router.post('/login',
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ user:false, errors: 'Invalid credentials' });
      }
      const isPasswordMatch = await bcrypt.compare(password, userData.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ user:false, errors: 'Invalid credentials' });
      }
      const tokenPayload = {
        user: {
          id: userData.id,
          email: userData.email, 
        },
      };
      const authToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

      return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ user: false, error: 'Error logging in' });
    }
  }
);
module.exports = router;
