const router = require('express').Router();
const upload = require('../middleware/uploadMulter')
const Controller = require('../controllers/adminController');

router.get('/', Controller.adminPage);
router.get('/profile', Controller.profilePage);
router.get('/profile/edit', Controller.editProfileForm);
router.post('/profile/edit', upload.single('profileImg'), Controller.editProfile);

router.get('/add', Controller.addSubjectForm);
router.post('/add', Controller.addSubject);

router.get('/edit/:subjectId', Controller.editSubjectForm);
router.post('/edit/:subjectId', Controller.editSubject);

router.get('/delete/:subjectId', Controller.deleteSubject);

module.exports = router  