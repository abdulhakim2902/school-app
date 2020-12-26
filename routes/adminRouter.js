const router = require('express').Router();
const upload = require('../middleware/uploadMulter')
const Controller = require('../controllers/adminController');

router.get('/', Controller.adminPage);
router.get('/profile', Controller.profilePage);
router.get('/profile/edit', Controller.editProfileForm);
router.post('/profile/edit', upload.single('profileImg'), Controller.editProfile);

// Subjects
router.get('/add', Controller.addSubjectForm);
router.post('/add', Controller.addSubject);

router.get('/edit/:subjectId', Controller.editSubjectForm);
router.post('/edit/:subjectId', Controller.editSubject);

router.get('/delete/:subjectId', Controller.deleteSubject);

// Lecturers
router.get('/add-lecturer', Controller.addLecturerForm);
router.post('/add-lecturer', Controller.addLecturer);

router.get('/edit-lecturer/:lecturerId', Controller.editLecturerForm);
router.post('/edit-lecturer/:lecturerId', Controller.editLecturer);

router.get('/delete-lecturer/:lecturerId', Controller.deleteLecturer);

module.exports = router  