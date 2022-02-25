const {verifyToken} = require('../helpers/token');

async function validateToken(req, res, next) {
  token = req.params.token || req.body.token || req.headers["x-access-token"];

  if (!token) {
    return res.error('No token provided.', 401, null);
  }

  try {
    decodedToken = await verifyToken(token)
    res.locals.username = decodedToken.username;
    next();
  } catch (err) {
    return res.error('Invalid token.', 401, null);
  }
}

module.exports = validateToken;