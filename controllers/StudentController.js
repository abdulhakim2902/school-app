const { User, Subject, UserSubject } = require('../models')
const fs = require('fs')

class Controller {
    static studentPage(req, res) {
        let id = req.session.userId;

        User.findOne({
            where: { id },
            include: {
                model: Subject,
                through: {
                    where: {
                        is_taken: true
                    }
                }
            }
        })
            .then(user => res.render('studentPage/student-page', { student }))
            .catch(err => res.send(err.message))
        
    }

    static profilePage(req, res) {
        let id = req.session.userId;
        let totalCredits = 0;

        User.totalCredits(Subject, id)
            .then(credits => {
                totalCredits = credits;

                return User.findOne({
                    where: { id },
                    include: {
                        model: Subject,
                        through: {
                            where: {
                                is_taken: true
                            }
                        }
                    }
                })
            })
            .then(student => {
                res.render('studentPage/profile-page', { student, totalCredits }) 
            })
            .catch(err => res.send(err))
               
    }
    
    static editProfileForm(req, res) {
        let id = req.session.userId;

        User.findOne({where: {id}})
            .then(student => res.render('studentPage/edit-profile-page', {student}))
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

        User.findOne({where: {id}})
            .then(student => {
                if (imgFile) {
                    editUser.profileImg = imgFile.filename;
                    if (student.profileImg) {
                        fs.unlinkSync(`./public/uploads/img/${student.profileImg}`)
                    }
                }

                return User.update(editUser, { where: { id } })
            })
            .then(() => res.redirect('/student/profile'))
            .catch(err => res.send(err.message))
    }

    static subjectPage(req, res) {
        let id = req.session.userId;
        let error = '';
        let untakeSubject = [];

        if (req.query.msg) {
            error = req.query.msg
        }

        Subject.findAll({
            include: {
                model: User,
                through: {
                    where: {
                        user_id: id
                    },
                    attributes: ['is_taken']
                }
            }
        })
            .then(subjects => {
                subjects.forEach(subject => {
                    if (subject.Users.length === 0) {
                        untakeSubject.push(subject)
                    } else if (!subject.Users[0].UserSubjects.dataValues.is_taken){
                        untakeSubject.push(subject)
                    }
                })

                res.render('studentPage/subjects-page', { subjects: untakeSubject, error })
            })
            .catch(err => res.send(err))
    }

    static takenSubject(req, res) {
        let studentId = req.session.userId;
        let subjectId = req.params.courseId;
        let totalCredits = 0;
        let totalStudents = 0;

        User.findOne({
            where: {
                id: studentId
            },
            include: {
                model: Subject,
                through: {
                    where: {
                        is_taken: true
                    }
                }
            }
        })
            .then(user => {
                let subjects = user.Subjects;

                subjects.forEach(subject => {
                    totalCredits += +subject.credits;
                })

                if (totalCredits >= 24) {
                    throw new Error('You have taken too much credits for this semester')
                } else {
                    return Subject.findOne({
                        where: {
                            id: subjectId
                        },
                        include: {
                            model:User,
                            through: {
                                where: {
                                    is_taken: true
                                }
                            }
                        }
                    })
                }
            })
            .then(subject => {
                totalCredits += +subject.credits;
                totalStudents += +subject.Users.length;

                if (totalCredits <= 24) {
                    if (totalStudents < subject.maxStudents) {
                        return Subject.update({quota: subject.quota - 1}, {where: {id: subject.id}})
                    }
                } else {
                    throw new Error('You have taken too much credits for this semester')
                }
            })
            .then(() => {
                return UserSubject.findOne({
                    where: {
                        user_id: studentId,
                        subject_id: subjectId
                    }
                })
            })
            .then(userSubject => {
                if (!userSubject) {
                    return UserSubject.create({user_id: studentId, subject_id: subjectId, is_taken: true})
                } else {
                    return UserSubject.update({is_taken: true}, {where: {id: userSubject.id}})
                }
            })
            .then(() => res.redirect(`/student/subjects`))
            .catch(err => res.redirect(`/student/subjects?msg=${err.message}`))
    }

    static untakeSubject(req, res) {
        let studentId = req.session.userId;
        let subjectId = req.params.courseId;

        Subject.findOne({where: {id: subjectId}})
            .then(subject => {
                return Subject.update({quota: subject.quota + 1}, {where: {id: subject.id}})
            })
            .then(() => {
                return UserSubject.update({ is_taken: false }, {
                    where: {
                        user_id: studentId,
                        subject_id: subjectId
                    }
                })
            })
            .then(() => res.redirect(`/student`))
            .catch(err => res.send(err.message))
    }

    static detailSubject (req, res) {
        let subjectId = req.params.courseId;

        Subject.findOne({
            where: {
                id: subjectId
            },
            include: {
                model: User,
                through: {
                    where: {
                        is_taken: true
                    }
                }
            }
        })  
            .then(subject => res.render('studentPage/detail-page', { subject }))
            .catch(err => res.send(err.message))
    }
}

module.exports = Controller