module.exports = {
  checkAuthenticated: (req, res, next) => {
    const sessions = req.sessionStore.sessions;
    let passport = {}

    for(let sessionID in sessions) {
      let sessionTest = JSON.parse(sessions[sessionID]);
      if (sessionTest.hasOwnProperty('passport')) {
        passport = sessionTest.passport
      }
    }

    if (Object.keys(passport).length === 0 && passport.constructor === Object) {
      return res.status(404).send("must authenticate");
    } else {
      return next();
    }
  }
};
