const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/mochaTestingDb?retryWrites=true&w=majority`;

// before(async function() {
//   console.log(MONGODB_URI)
//   mongoose_connection = await mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
// })

// after(async function() {
//   mongoose_connection.connection.close();
// })

// describe('Successful connection to database', function () {
//   it('connects to database using mongoose', function () {
//     expect(mongoose_connection.connection.readyState).to.equal(1);
//   })
// })

