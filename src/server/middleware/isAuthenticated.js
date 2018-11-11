module.exports = {
  checkAuthenticated: (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Login Required');
    } else {
      next();
    }
  }
};
