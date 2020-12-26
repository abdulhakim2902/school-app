const { User, Subject, UserSubject } = require('../models');

class Controller {
    static adminPage(req, res) {
        let id = req.session.userId;

        User.findOne({where: {id}})
            .then(admin => res.render('adminPage/admin-page', { admin }))
            .catch(err => res.send(err))
        
    }
}

module.exports = Controller