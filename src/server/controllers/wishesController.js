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

    reserveWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.reserve_wish([body.reservedUserId, body.wishId])
      .then(result => {
          return res.status(200).send('Wish Reserved');
      });
    },

    releaseWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.release_wish([body.wishId])
      .then(result => {
          return res.status(200).send('Wish Released');
      });
    },

    addWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.get_max_wish_id()
        .then(maxID => {
            var newID = maxID[0].maxwishid + 1;

            dbInstance.add_wish([newID, body.userId, body.title, body.description, body.cost, body.link, body.rating])
              .then(result => {
                return res.status(200).send('Wish Added')
              });
        });
    },

    deleteWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.delete_wish([body.wishId])
        .then(result => {
          return res.status(200).send('Wish Deleted')
        });
    },

    updateWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.update_wish([body.title, body.description, body.cost, body.link, body.rating, body.wishId])
        .then(result => {
          return res.status(200).send('Wish Updated')
        });
    },

    getReservedWishes: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.get_my_reserved_wishes([body.userId])
        .then(result => {
          return res.status(200).send(result)
        });
    },

    updateWishesUser: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.update_wishes_user([body.userId, body.edwUserId, body.familyId, body.isParent, body.firstName, body.lastName, body.isAdmin, body.birthday, body.anniversary, body.group1, body.group2, body.group3])
        .then(result => {
          return res.status(200).send('Wishes user updated')
        })
    },

    updateWishesFamily: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.update_wishes_family([body.familyId, body.familyName, body.parent1, body.parent2, body.familyGroup])
        .then(result => {
          return res.status(200).send('Wishes family updated')
        })
    }
  }
