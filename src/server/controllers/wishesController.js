module.exports = {
    getActiveUser: (req, res, net) => {
        const body = req.body;
        const dbInstance = req.app.get('db');

        dbInstance.get_wishes_user([body.id])
            .then(result => {
                return res.status(200).send(result);
            });
    },

    getFamilyReference: (req, res, net) => {
      const dbInstance = req.app.get('db');

      dbInstance.get_family_reference()
          .then(result => {
              return res.status(200).send(result);
          });
    },

    getAllUsers: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_wishes_users()
            .then(result => {
                return res.status(200).send(result);
            });
    },

    getWishes: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        dbInstance.get_wishes_for_user([body.id])
            .then(result => {
                return res.status(200).send(result);
            });
    },

    reserveWish: (req, res, net) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.reserve_wish([body.reservedUserId, body.wishId])
      .then(result => {
          return res.status(200).send(result);
      });
    },

    releaseWish: (req, res, net) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.release_wish([body.wishId])
      .then(result => {
          return res.status(200).send(result);
      });
    }
  }
