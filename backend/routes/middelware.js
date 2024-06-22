const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(403)
      .json({ msg: 'No token provided or invalid token format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userid) {
      console.log(decoded);
      req.userId = decoded.userid;
      next();
    } else {
      return res
        .status(401)
        .json({ msg: 'Token does not contain user information' });
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Token verification failed', err });
  }
};

module.exports = { authMiddleware };
