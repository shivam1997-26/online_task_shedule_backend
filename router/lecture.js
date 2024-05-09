const express = require('express')
const { addLecture, deleteLecture, getLecture, updateLecture, getaLecture, getLectureByInstructor } = require('../controller/lecture')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/add/lecture', isAdmin, addLecture)
router.post('/deleteLecture/:id', authMiddleware, isAdmin, deleteLecture)
router.get('/get/lecture', authMiddleware, getLecture)
router.get('/get/lecture/instructor/:id', authMiddleware, getLectureByInstructor)
router.get('/get/lecture/:id', authMiddleware, getaLecture)
router.post('/updateLecture/:id', authMiddleware, isAdmin, updateLecture)

module.exports = router