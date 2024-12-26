
import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const refreshTokenSecret=process.env.REFRESH_TOKEN_SECRET;

export const registerStudent = async (req,res) => {
    
    try {
     const{email,password,role,firstName,lastName,middleName,rollNo}=req.body;
      // Validate inputs
      if (!email || !password || !role||!lastName||!firstName||!rollNo) {
        throw new Error("Email, password, and role are required");
      }
  
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
  
      // Check if user already exists
      const existingUser = await db.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists");
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate refresh token
      const refreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: "15d" });
  
      // Create user
     
        const newUser = await db.user.create({
            data: {
              email,
              firstName,
              lastName,
              middleName,
              password: hashedPassword,
              role,
              refreshToekn: refreshToken,
              student:db.student.create({
                data:{
                    rollNo,
                }
              })
            },
          });
      
    
  
      return {
        message: "User registered successfully",
        data: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          refreshToken: newUser.refreshToekn,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export const registerTeacher= async(req,res)=>{
    try {
        const{email,password,role,firstName,lastName,middleName,isController,subjects}=req.body;
         // Validate inputs
         if (!email || !password || !role||!lastName||!firstName) {
           throw new Error("Email, password, and role are required");
         }
     
         if (password.length < 6) {
           throw new Error("Password must be at least 6 characters");
         }
     
         // Check if user already exists
         const existingUser = await db.user.findUnique({ where: { email } });
         if (existingUser) {
           throw new Error("User already exists");
         }
     
         // Hash password
         const hashedPassword = await bcrypt.hash(password, 10);
     
         // Generate refresh token
         const refreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: "15d" });
     
         // Create user
        
           const newUser = await db.user.create({
               data: {
                 email,
                 firstName,
                 lastName,
                 middleName,
                 password: hashedPassword,
                 role,
                 refreshToekn: refreshToken,
                 teacher:db.teacher.create({
                     data:{
                         isController,
                         subjects
                     }
                 })
               },
             });
         
       
     
         return {
           message: "User registered successfully",
           data: {
             id: newUser.id,
             email: newUser.email,
             role: newUser.role,
             refreshToken: newUser.refreshToekn,
           },
         };
       } catch (error) {
         throw new Error(error.message);
       }
  }

  export const login = async (req,res) => {
    try {
      // Validate inputs
      const { email, password,rollNo } = req.body;
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
  
      // Find user by email
      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Invalid email");
      }
  
      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Incorrect password");
      }
  
      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        accessTokenSecret,
        { expiresIn: "1d" }
      );
  
      const refreshToken = jwt.sign(
        { id: user.id, role: user.role },
        refreshTokenSecret,
        { expiresIn: "15d" }
      );
  
      // Update refresh token in database
      await db.user.update({
        where: { id: user.id },
        data: { refreshToekn: refreshToken },
      });
  
      return {
        message: "Login successful",
        tokens: { accessToken, refreshToken },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const logout = async (id) => {
    try {
      // Validate input
      if (!id) {
        throw new Error("User ID is required");
      }
  
      // Clear refresh token
      await db.user.update({
        where: { id },
        data: { refreshToekn: null },
      });
  
      return { message: "Logout successful" };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
 