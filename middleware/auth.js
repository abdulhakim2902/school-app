const isLogin = (req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        res.redirect(`/login?msg=${"You need to login first!"}`)
    }
}

const sessionChecker = (req, res, next) => {
    if (req.session.userId) {
        res.redirect(`/student`)
    } else {
        next()
    }
}

module.exports = { isLogin, sessionChecker }