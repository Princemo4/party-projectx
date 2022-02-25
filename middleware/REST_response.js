const success = (res) => {
  return (message, data) => {
    if (!data && typeof message === 'object') {
      data = message;
      message = null;
    }

    return res.json({
      error: false,
      message: message, 
      data: (data !== null && typeof data !== 'undefined') ? data : null
    })
  }
}

const error = (res) => {
  return(message, code, data) => {
      if (message instanceof Error) {
          message = process.env.NODE_ENV === 'production' 
              ? message.message : message.message + '\n' + message.stack;
      } else if (typeof message === 'string') {
          message = message;
      } else {
          throw new Error('A valid error object or string is required.');
      }

      let body = {
          error: true,
          message: message
      };

      if(code && (typeof code === 'string' || typeof code === 'number'))
          body.code = code;

      if(data && typeof data === 'object') 
          body.data  = data;
      
      return res.status(500).json(body);
  };
};


const index = () => {
  return (req, res, next) => {
      res.success = success(res);
      res.error = error(res);
      next();
  }
}

module.exports = index;