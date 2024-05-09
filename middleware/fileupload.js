const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'public');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })

module.exports = upload