const multer = require('multer');
const path = require('path')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/img')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage })

module.exports = upload;