const middlewareObj = {};
const db = require('../models/index');

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.redirectTo = req.originalUrl;
  return res.status(400).json({ error: 'You need to be logged in to do that' });
};

middlewareObj.verifyNumber = function(req, res, next) {
  db.User.find({ _id: req.body.id, phone: req.body.phone })
    .then(data => {
      if (data.length > 0) {
        return next();
      }
      return res.status(400).json({ error: 'Sim change Detected' });
    })
    .catch(err => {
      return next(err);
    });
};

middlewareObj.isAdmin = async function(req, res, next) {
  console.log(res.locals.role);
  if (res.locals.role === 'admin') {
    return next();
  }
  const un = {
    url: req.originalUrl,
    date:Date.now()
  };
  const { user } = req;
  user.unauthorized.push(un);
  user.save();
  return res.render('error', {
    status: 'Unauthorized',
    message: `Request by <b>${req.user.name}</b>, this incident will be reported`
  });
};


middlewareObj.isEmployee = async function(req, res, next) {
  console.log(res.locals.role);
  if (res.locals.role === 'employee') {
    return next();
  }
  const un = {
    url: req.originalUrl,
    date:Date.now()
  };
  const { user } = req;
  user.unauthorized.push(un);
  user.save();
  return res.render('error', {
    status: 'Unauthorized',
    message: `Request by <b>${req.user.name}</b>, this incident will be reported`
  });
};

middlewareObj.isStudent = async function(req, res, next) {
    console.log(res.locals.role);
    if (res.locals.role === 'student') {
      return next();
    }
    const un = {
      url: req.originalUrl,
      date:Date.now()
    };
    const { user } = req;
    user.unauthorized.push(un);
    user.save();
    return res.render('error', {
      status: 'Unauthorized',
      message: `Request by <b>${req.user.name}</b>, this incident will be reported`
    });
  };
module.exports = middlewareObj;
