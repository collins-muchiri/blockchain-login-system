import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js'

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        logger.error(`Token verification failed: ${err.message}`)
        return res.status(403).json({ error: 'Invalid token' })
      }

      req.user = user
      next()
    })
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`)
    res.status(500).json({ error: 'Authentication failed' })
  }
} 