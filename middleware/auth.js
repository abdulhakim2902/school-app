const isLogin = (req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        res.redirect(`/login?msg=${"You need to login first!"}`)
    }
}

const sessionChecker = (req, res, next) => {
    if (req.session.userId) {
        if (req.session.role == 1) res.redirect(`/student`);
        else if (req.session.role == 2) res.redirect('/admin')
    } else {
        next()
    }
}

const isAdmin = (req, res, next) => {
    if (req.session.role == 2) {
        next()
    } else {
        res.redirect('/login')
    }
}

const isStudent = (req, res, next) => {
    if (req.session.role == 1) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = { isLogin, sessionChecker, isAdmin, isStudent }