const jwt = require('jsonwebtoken');
const User = require('../models/user-model'); // Import your User model

const authMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your JWT secret

        // Optionally, fetch user details from the database (if needed)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user; // Attach user information to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
