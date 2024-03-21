// authMiddleware.js

const jwt = require('jsonwebtoken');

const secret_key = 'bb06f4abc0cbf930660696ae7b9582ccba58975e843d1a064ebd8585d0c730026803ad79dd03f7d11bbc355dc57470f00a1c4ab892ed6ac4075c5c26d33af4a1';
// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    // Get the JWT token from request headers
    const token = req.headers?.authorization;
    // console.log("token ",token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' ,token});
    }


    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Attach user information to request object for further use
       console.log(decoded);
       req.user = decoded;
        next();
    });


};
