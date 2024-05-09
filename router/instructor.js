const express = require('express')
const { addInstructor, getInstructor, getaInstructor, deleteInstructor, updateInstructor, login } = require('../controller/instructor')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add/instructor', authMiddleware, isAdmin, addInstructor)
router.get('/get/allInstructorList', authMiddleware, getInstructor)
router.get('/get/Instructor/:id', authMiddleware, getaInstructor)
router.post('/Instructor/:id', authMiddleware, isAdmin, deleteInstructor)
router.post('/updateinstructor/:id', authMiddleware, isAdmin, updateInstructor)
router.post('/login', login)

module.exports = router