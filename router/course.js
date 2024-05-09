const express = require('express')
const { addCourse, getCourse, getaCourse, deleteCourse, updateCourse } = require('../controller/course')
const upload = require('../middleware/fileupload')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/add/course', authMiddleware, upload.single('image'), addCourse)
router.get('/get/course', authMiddleware, getCourse)
router.get('/get/getaCourse/:id', authMiddleware,isAdmin, getaCourse)
router.delete('/deleteCourse/:id', authMiddleware, deleteCourse)
router.put('/updateCourse/:id', authMiddleware, updateCourse)

module.exports = router
