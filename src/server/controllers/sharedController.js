module.exports = {
  getUser: (req, res, next) => {
    const body = req.body;
      const dbInstance = req.app.get('db')

      dbInstance.find_session_user([body.id])
      .then( user => {
        return res.status(200).send(user[0])
      })
  },

  getAdmin: (req, res, next) => {
    const dbInstance = req.app.get('db');

    let payload = {
      edwUsers: [],
      wishesUsers: [],
      wishesFamilies: []
    }

    dbInstance.get_edw_users()
      .then(edwUsers => {
        payload.edwUsers = edwUsers;

        dbInstance.get_wishes_users_admin()
          .then(wishesUsers => {
            payload.wishesUsers = wishesUsers

            dbInstance.get_family_reference()
              .then(families => {
                payload.wishesFamilies = families
                return res.status(200).send(payload);
              })
          })
      })
  },

  updateEdwUser: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const body = req.body;

    dbInstance.update_edw_users([body.userId, body.email, body.isAdmin, body.wishes, body.lanParty, body.calendar, body.firstName, body.lastName, body.auth0Id])
      .then(response => {
        return res.status(200).send('EDW User Updated')
      })
  }
}
