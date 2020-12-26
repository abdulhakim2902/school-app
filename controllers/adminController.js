const { User, Subject, UserSubject } = require('../models');

class Controller {
    static adminPage(req, res) {
        let id = req.session.userId;

        Subject.findAll()
            .then(subjects => {
                res.render('adminPage/admin-page', { subjects, status: 'admin' })
            })
    }

    static profilePage(req, res) {
        let id = req.session.userId;

        User.findOne({where: {id}})
            .then(admin => res.render('adminPage/profile-page', { user: admin, status: 'admin' }))
            .catch(err => res.send(err.message))
    }

    static editProfileForm(req, res) {
        let id = req.session.userId;

        User.findOne({where: {id}})
            .then(admin => res.render('adminPage/edit-profile-page', { user: admin, status: 'admin' }))
            .catch(err => res.send(err.message))
    }

    static editProfile(req, res) {
        let id = req.session.userId;
        let imgFile = req.file;

        let editUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthPlace: req.body.birthPlace,
            birthDate: req.body.birthDate,
            gender: req.body.gender || ''
        }

        User.findOne({ where: { id } })
            .then(admin => {
                if (imgFile) {
                    editUser.profileImg = imgFile.filename;
                    if (admin.profileImg) {
                        fs.unlinkSync(`./public/uploads/img/${admin.profileImg}`)
                    }
                }

                return User.update(editUser, { where: { id } })
            })
            .then(() => res.redirect('/admin/profile'))
            .catch(err => res.send(err.message))
    }

    static addSubjectForm(req, res) {
        req.render('subjectPage/add-form-page')
    }

    static addSubject(req, res) {
        let newSubject = {
            name: req.body.name,
            lecturer: req.body.lecturer,
            credits: req.body.credits,
            maxStudents: req.body.maxStudents,
            quota: req.body.maxStudents
        }

        Subject.create(newSubject)
            .then(() => res.redirect('/admin'))
            .catch(err => res.send(err.message))
    }

    static editSubjectForm(req, res) {
        let id = req.params.subjectId;
        let error = '';

        if (req.query.msg) {
            error = req.query.msg
        }

        Subject.findOne({where: {id}})
            .then(subject => res.render('subjectPage/edit-form-page', { subject, error }))
            .catch(err => res.send(err.message))
    }

    static editSubject(req, res) {
        let id = req.params.subjectId;

        let editSubject = {
            name: req.body.name,
            lecturer: req.body.lecturer,
            credits: req.body.credits,
            maxStudents: req.body.maxStudents
        }

        Subject.findOne({where: {id}})
            .then(subject => {
                let currentMaxStudents = subject.maxStudents;
                let currentQuota = subject.quota;
                let updatedQuota = currentQuota + (editSubject.maxStudents - currentMaxStudents);

                editSubject.quota = updatedQuota;
                
                if (updatedQuota > 0) {
                    return Subject.update(editSubject, {where: {id}})
                } else {
                    throw new Error('The quota cannot be less than zero')
                }
            })
            .then(() => res.redirect('/admin'))
            .catch(err => res.redirect(`/admin/edit/${id}?msg=${err}`))
    }

    static deleteSubject(req, res) {
        let id = req.params.subjectId;

        Subject.destroy({where: {id}})
            .then(() => res.redirect('/admin'))
            .catch(err => res.send(err.message))
    }
}

module.exports = Controller