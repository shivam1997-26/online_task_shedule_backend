const express = require('express')
const { addCourse, getCourse, getaCourse, deleteCourse, updateCourse } = require('../controller/course')
const upload = require('../middleware/fileupload')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/add/course', authMiddleware, upload.single('image'), addCourse)
router.get('/get/course', authMiddleware, getCourse)
router.get('/get/getaCourse/:id', authMiddleware, getaCourse)
router.post('/deleteCourse/:id', authMiddleware,isAdmin, deleteCourse)
router.post('/updateCourse/:id', authMiddleware,isAdmin, updateCourse)

module.exports = router
