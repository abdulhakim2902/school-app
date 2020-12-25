const router = require('express').Router();
const Controller = require('../controllers/StudentController');
const upload = require('../middleware/uploadMulter')

router.get('/', Controller.studentPage);
router.get('/profile', Controller.profilePage);
router.get('/subjects', Controller.subjectPage);
router.get('/taken/:courseId', Controller.takenSubject);
router.get('/untake/:courseId', Controller.untakeSubject);
router.get('/detail/:courseId', Controller.detailSubject);

router.get('/profile/edit', Controller.editProfileForm);
router.post('/profile/edit', upload.single('profileImg'), Controller.editProfile)

module.exports = router