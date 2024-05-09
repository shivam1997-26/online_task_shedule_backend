const jwt = require('jsonwebtoken');
const instructor = require('../model/instructor');


const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        token = req.headers.authorization.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await instructor.findById(decoded?.id)
            req.user = user;
            next()

        } catch (err) {
            res.status(500).json({ message: 'Not Authorized token expired please login again' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(401).json({ message: 'you  are not an admin' })
    } else {
        next()
    }

}


module.exports = { authMiddleware, isAdmin }