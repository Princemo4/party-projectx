const JWT = require('jsonwebtoken');
require('dotenv').config();

function createToken(username) {
  token = JWT.sign( 
    { username: username }, process.env.TOKEN_KEY, { expiresIn: '2h' }
  )
  return token;
}

function verifyToken(token) {
  try {
    decodedToken = JWT.verify(token, process.env.TOKEN_KEY);
    console.log('decoded Token: ', decodedToken);
    return decodedToken;
  } catch (e) {
    console.log('verifyToken error: ', e);
    return false;
  }

}

module.exports = { createToken, verifyToken };