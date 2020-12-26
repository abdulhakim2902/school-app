const { User } = require('../models')
const { comparePassword } = require('../helpers/hash')
const { Op } = require('sequelize')

class Controller {
    static loginForm (req, res) {
        let error = '';
        if (req.query.msg) {
            error = req.query.msg
        }

        res.render('authPage/login-page' , { error })
    }

    static login(req, res) {
        let isUser = {
            username: req.body.username,
            password: req.body.password,
            role: +req.body.role
        }

        console.log(isUser);
        
        User.findOne({
            where: { username: isUser.username }
        })
            .then(user => {
                if (!user) {
                    res.redirect(`/login?msg=${"The username and role that you've entered doesn't match any account."}`)
                } else {
                    let isValidPassword = comparePassword(user.password, isUser.password);

                    if (user.role === 1 && isValidPassword) {
                        req.session.userId = user.id
                        res.redirect('/student')
                    } else if (user.role === 2 && isValidPassword) {
                        req.session.userId = user.id
                        res.redirect('/admin')
                    } else {
                        res.redirect(`/login?msg=${"The username and role that you've entered doesn't match any account."}`)
                    }
                }
            })
    }

    static registerForm(req, res) {
        let error = '';

        if (req.query.msg) {
            error = req.query.msg;
        }

        res.render('authPage/register-page', {error})
    }

    static register(req, res) {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthPlace: '',
            birthDate: req.body.birthDate,
            gender: req.body.gender || '',
            profileImg: '' 
        };

        User.findOne({where: {
            [Op.or]: [{ username: newUser.username }, { email: newUser.email }]
        }})
            .then(user => {
                if (!user) return User.create(newUser);
                else throw new Error('Username or email already exist!')
            })
            .then(() => res.redirect('/login'))
            .catch(err => res.redirect(`/register?msg=${err.message}`))
    }

    static logout(req, res) {
        req.session.userId = 0;
        res.redirect('/login')
    }
}

module.exports = Controller