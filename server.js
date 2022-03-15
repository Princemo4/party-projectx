const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const REST_response = require('./middleware/REST_response');
// const session = require('express-session');
const Auth = require('./middleware/auth');
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
console.log('db connection string: ' , MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((connection) => {
  console.log(' Connected to MongoDB');
}).catch((error) => {console.log(error)});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(REST_response())
app.use(cors());

const Authentication = require('./routes/authentication');
const Events = require('./routes/event/index');
const User = require('./routes/user');

const showRequest = (req, res, next) => {
  console.log('Params: ', req.params)
  console.log('Body: ', req.body)
  next()
}

//Routes
app.use('/api/authentication', showRequest, Authentication);
app.use('/api/events', Events)
app.use('/api/user', User);
app.use('/_health', (req,res) => {
  res.status(200).send('OK')
})

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({ error: true, code: 400, message: err.message }); // Bad request
  }
  next();
});

app.use('*', Auth, function(req, res, next) {
  res.success('Hello World!');
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
