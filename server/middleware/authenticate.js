var User  = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject('User has not been found');
      }

      req.user = user;
      req.token = token;
      next();
    }).catch((e) => {
      res.status(401).json({ 
        title: 'Authentication failed',
        error: { message:'User is not authenticated' }
      });
    });
};

module.exports = { authenticate };
