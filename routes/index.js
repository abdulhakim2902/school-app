const router = require('express').Router();
const studentRouter = require('./studentRouter');
const Controller = require('../controllers/UserController');
const { isLogin,sessionChecker } = require('../middleware/auth');

router.use('/student', isLogin, studentRouter)
router.get('/logout', isLogin, Controller.logout)

router.use(sessionChecker)
router.get('/', Controller.loginForm);
router.get('/login', Controller.loginForm);
router.post('/login', Controller.login)

router.get('/register', Controller.registerForm)
router.post('/register', Controller.register);

module.exports = router    