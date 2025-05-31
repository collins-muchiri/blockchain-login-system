import express from 'express'
import { ethers } from 'ethers'
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js'

const router = express.Router()

// Verify signature and generate JWT
router.post('/login', async (req, res) => {
  try {
    const { address, signature, message } = req.body

    if (!address || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signature)
    
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { address },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Log successful login
    logger.info(`User logged in: ${address}`)

    res.json({ token })
  } catch (error) {
    logger.error(`Login error: ${error.message}`)
    res.status(500).json({ error: 'Authentication failed' })
  }
})

// Verify JWT token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true, address: decoded.address })
  } catch (error) {
    logger.error(`Token verification error: ${error.message}`)
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router 