const {verifyToken} = require('../helpers/token');
const User = require('../models/user');

async function validateToken(req, res, next) {
  token = req.params.token || req.body.token || req.headers["x-access-token"];

  if (!token) {
    return res.error('No token provided.', 401, null);
  }

  try {
    decodedToken = await verifyToken(token)
    if (!decodedToken) { return res.error('Error decoding token.', 401, null); }
    console.log('decodedToken:', decodedToken)
    // res.locals.username = decodedToken.user.username;
    // res.locals.userId = decodedToken.user._id;
    return decodedToken;
    // next();
  } catch (err) {
    return false;
  }
}

async function Auth(req, res, next) {
  let decodedToken = await validateToken(req, res); 
  if (!decodedToken) { return res.error('Error decoding token.', 401, null); }

  res.locals.username = decodedToken.user.username;
  res.locals.userId = decodedToken.user._id;

  const user = await User.findOne({username: res.locals.username});

  // do not allow the user to protected paths if user is inactive, unless it's to activate the account
  if (user && user.active == false && (req.path != `/${res.locals.username}/activate`)) {
    return res.error('User is not active.', 401, null);
  }
  next()
}

module.exports = Auth;