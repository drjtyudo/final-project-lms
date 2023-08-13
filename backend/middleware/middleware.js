const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken; 
  if (!token) {
    return res.status(401).json({ msg: 'Akses token tidak ditemukan' });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: 'Akses token tidak valid' });
    }
    req.user = user;
    next();
  });
};
