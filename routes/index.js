const router = require('express').Router();
const studentRouter = require('./studentRouter');
const adminRouter = require('./adminRouter');
const Controller = require('../controllers/UserController');
const { isLogin,sessionChecker, isAdmin, isStudent } = require('../middleware/auth');

router.use('/student', isLogin, isStudent, studentRouter)
router.use('/admin', isLogin, isAdmin, adminRouter)

router.get('/logout', isLogin, Controller.logout)

router.use(sessionChecker)
router.get('/', Controller.loginForm);
router.get('/login', Controller.loginForm);
router.post('/login', Controller.login)

router.get('/register', Controller.registerForm)
router.post('/register', Controller.register);

module.exports = router    