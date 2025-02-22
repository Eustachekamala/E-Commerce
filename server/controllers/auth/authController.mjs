import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../../models/User.mjs";

//register
export const registerUser = async (req, res, next) => {
    const { userName, email, password } = req.body;

    // Check if all fields are provided
    if (!userName || !email || !password) {
        const error = createHttpError(400, "All fields are required!");
        return next(error);
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user instance
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // Save the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
            },
        });
    } catch (error) {
        // Handle errors (e.g., duplicate email, database errors)
        if (error.code === 11000) {
            // Duplicate key error (e.g., email already exists)
            const err = createHttpError(400, "Email already exists!");
            return next(err);
        }
        next(error);
    }
};



//login
export const login = async (req, res, next) => {
    const { email, password } = req.body
        if(!email || !password){
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }
    try {
        
    } catch (error) {
        next(error)
    }
}


// logout
export const logout = async (req, res, next) => {

    try {
        
    } catch (error) {
        next(error)
    }
}

//auth middleware

