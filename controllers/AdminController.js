const { User, Subject, Lecturer, UserSubject } = require('../models');

class Controller {
    static adminPage(req, res) {
        let lecturers = [];

        Lecturer.findAll()
            .then(getLecturers => {
                lecturers = getLecturers;

                return Subject.findAll({
                    include: Lecturer
                })
            })
            .then(subjects => {
                res.render('adminPage/admin-page', { subjects, lecturers, status: 'admin' })
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
        Lecturer.findAll()
            .then(lecturers => res.render('subjectPage/add-form-page', { lecturers }))
            .catch(err => res.send(err.message))
    }

    static addSubject(req, res) {
        let newSubject = {
            name: req.body.name,
            credits: req.body.credits,
            maxStudents: req.body.maxStudents,
            quota: req.body.maxStudents,
            lecturer_id: req.body.lecturer_id
        }

        Subject.create(newSubject)
            .then(() => res.redirect('/admin'))
            .catch(err => res.send(err.message))
    }

    static editSubjectForm(req, res) {
        let id = req.params.subjectId;
        let lecturers = [];
        let error = '';

        if (req.query.msg) {
            error = req.query.msg
        }

        Lecturer.findAll()
            .then(getLecturers => {
                lecturers = getLecturers;

                return Subject.findOne({ 
                    where: { id },
                    include: Lecturer
                })
            })
            .then(subject => res.render('subjectPage/edit-form-page', { subject, lecturers, error }))
            .catch(err => res.send(err.message))
    }

    static editSubject(req, res) {
        let id = req.params.subjectId;

        let editSubject = {
            name: req.body.name,
            lecturer_id: req.body.lecturer_id,
            credits: req.body.credits,
            maxStudents: req.body.maxStudents
        }

        Subject.findOne({where: {id}})
            .then(subject => {
                let currentMaxStudents = subject.maxStudents;
                let currentQuota = subject.quota;
                let updatedQuota = currentQuota + (editSubject.maxStudents - currentMaxStudents);

                editSubject.quota = updatedQuota;
                
                if (updatedQuota >= 0) {
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

    static addLecturerForm(req, res) {
        res.render('lecturerPage/add-lecturer-form-page')
    }

    static addLecturer(req, res) {
        let { frontTitle, backTitle, firstName, lastName } = req.body;
        let name = `${frontTitle ? frontTitle : ''} ${firstName} ${lastName} ${backTitle ? backTitle : ''}`.trim()
        
        Lecturer.create({name})
            .then(() => res.redirect('/admin'))
            .catch(err => res.send(err.message))
    }

    static editLecturerForm (req, res) {
        
    }

    static editLecturer(req, res) {

    }

    static deleteLecturer(req,res) {
        let id = req.params.lecturerId;

        Lecturer.destroy({where: {id}})
            .then(() => res.redirect('/admin'))
            .catch(err => res.send(err.message))
    }
}

module.exports = Controller