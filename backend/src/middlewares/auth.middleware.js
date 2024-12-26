// import jwt from "jsonwebtoken";
// import env from "../utils/env.js";

// // Middleware to check if the user is authenticated
// export const isAuthenticated = (req, res, next) => {
//     const accessToken = req.cookies.accessToken;

//     if (!accessToken) {
//         return res.status(401).json({
//             message: "Unauthorized: No access token found. Please log in.",
//             success: false,
//         });
//     }

//     try {
//         // Verify the access token
//         const decoded = jwt.verify(accessToken, env.auth.accessTokenSecret);

//         // Attach user details to the request object so that other routes can access it
//         req.user = {
//             id: decoded.id,
//             role: decoded.role,
//         };

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.error("Error verifying access token:", error);

//         // If token verification fails, return unauthorized status
//         return res.status(401).json({
//             message: "Unauthorized: Invalid access token.",
//             success: false,
//         });
//     }
// };
