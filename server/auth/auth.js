const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized'});
  }

  const secretKey = process.env.SECRET;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token is not valid' });
    }

    // Attach the user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = auth;
