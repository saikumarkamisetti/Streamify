

// import jwt from 'jsonwebtoken';

// export const protectRoute = (req, res, next) => { // You named this protectRoute in your example
//     const authHeader = req.headers.authorization;
    
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//         const token = authHeader.split(" ")[1];
        
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) return res.status(403).json({ message: "Token is invalid or expired." });
            
//             // req.user will contain { id: '...', role: '...' } from the JWT payload
//             req.user = user; 
//             next();
//         });
//     } else {
//         return res.status(401).json({ message: "Unauthorized: No token provided." });
//     }
// };

// // 2. Admin Role Check (Authorization)
// export const verifyAdmin = (req, res, next) => {
//     // This runs after protectRoute, so req.user is guaranteed to exist
//     if (req.user && req.user.role === 'admin') {
//         next(); // Authorization granted
//     } else {
//         res.status(403).json({ message: "Forbidden: User is not an Administrator." });
//     }
// };