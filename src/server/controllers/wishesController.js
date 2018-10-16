module.exports = {
    getActiveUser: (req, res, net) => {
        const body = req.body;
        const dbInstance = req.app.get('db');

        dbInstance.get_wishes_user([body.id])
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
    }
  }
  