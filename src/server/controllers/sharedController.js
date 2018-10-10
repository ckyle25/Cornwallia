module.exports = {
  getUser: (req, res, next) => {
    const body = req.body;
      const dbInstance = req.app.get('db')

      dbInstance.find_session_user([body.id])
      .then( user => {
        return res.status(200).send(user[0])
      })
  }
}
