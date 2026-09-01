const jwt = require('jsonwebtoken');

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'cybershield_super_secret_jwt_key_2026';

function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Authorization token is required.'
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Invalid authorization format.'
    });
  }

  const token = parts[1];

  try {

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    console.error('JWT verification error:', err.message);

    return res.status(401).json({
      error: 'Invalid or expired token.'
    });
  }
}

module.exports = verifyToken;