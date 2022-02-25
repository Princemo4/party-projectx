const mocha = require('mocha');
const chai = require('chai');
const chai_http = require('chai-http');
chai.use(chai_http);
const expect = chai.expect;
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/mochaTestingDb?retryWrites=true&w=majority`;

describe('Test user model', function () {
  // before(async function () {
  //   server = 'http://localhost:' + process.env.PORT;
  //   mongoose_connection = await mongoose.connect(MONGODB_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   });
  // })

  // after(function () {
  //   mongoose_connection.connection.close();
  // })

  // it('should create a user using mongoose', async function () {
  //   const user = new User({
  //     username: 'test55',
  //     password: 'test',
  //     email: 'test55@test.com',
  //     firstName: 'Mo',
  //     lastName: 'Nasr',
  //     phone: '1234567890'
  //   })
  //   user.save();
  //   expect(user.username).to.equal('test55');
  //   expect(user.password).to.equal('test');
  //   expect(user.email).to.equal('test55@test.com');
  //   expect(user.firstName).to.equal('Mo');
  //   expect(user.lastName).to.equal('Nasr');
  //   expect(user.phone).to.equal('1234567890');
  // })

  it('should create a user using API', async function() {
    const res = await chai.request(server).post('/api/users').send({
      username: 'test55',
      password: 'test',
      email: '' 
    })
    expect(res.body.username).to.not.have.status(200);
  })
})