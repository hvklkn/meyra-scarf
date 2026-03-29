const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'meyra-scarf-secret-2024';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkisiz erişim: Token gerekli' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Yetkisiz erişim: Geçersiz token' });
  }
};

module.exports = authMiddleware;
