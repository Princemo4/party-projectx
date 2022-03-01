const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {createToken, verifyToken} = require('../helpers/token')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    default: createToken(this.username)
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true

  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  organizedEvents: {
    type: [Schema.Types.ObjectId],
    ref: 'Event'

  },
  attendingEvents: {
    type: [Schema.Types.ObjectId],
    ref: 'Event'
  },
  active: {
    type: Boolean,
    default: true
  }
})

userSchema.pre('save', function (next) {
  if(!this.isModified('password')) {
    next();
  }
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if(err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

userSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({username: username})
    .then(user => {
      if (!user) {
        let err = new Error('User not found');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
          let err = new Error('Password incorrect');
          err.status = 401;
          return callback(err);
        }

        // generate and save token
        user.token = createToken({username: user.username, _id: user._id});
        if (!user.token) { return callback(new Error('Error generating token')) }
        user.save().then(user => {return callback(null, user)} )
      })
    })
    .catch(err => {
      return callback(err);
    })
};

const User = mongoose.model('User', userSchema);
module.exports = User;
