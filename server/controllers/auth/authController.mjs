import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.mjs";
import config from "../../config/config.mjs";

//register
export const registerUser = async (req, res, next) => {
  const { userName, email, password } = req.body;

  // Check if all fields are provided
  if (!userName || !email || !password) {
    const error = new Error("All fields are required!");
    error.statusCode = 400;
    throw error;
  }

  try {
    // Check if the user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with this email! Please try again.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user instance
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
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
    res.status(500).json({ success: false, message: "Internal server error. Please try again." });
    next(error);
  }
};

//login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
  }

  try {
    // Find the user by email
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exits! Please register first",
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid password! Please try again",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ 
        id: checkUser._id, 
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName
         },config.accesTokenSecret, {
      expiresIn: "60m",
    });

     // Send a success response with the token
    res.status(200).json({
      success: true,
        message : "Logged in succesfully",
        token,
        user: {
        id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role
        }
    })


    // res.cookie('token', token, { httpOnly : true, secure : true}).json({
    //     success: true,
    //     message : "Logged in succesfully",
    //     user: {
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //     email: checkUser.email,
    //     role: checkUser.role
    //   },
    // })

  } catch (error) {
    // Handle errors
   console.log(error);
   
  }
};


//logout 
export const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout succesfully"
  })
};

//auth middleware
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1]
  if(!token) return res.status(401).json({
    success : false,
    message : "Unauthorized user!",
  })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
      res.status(401).json({
      success : false,
      message : "unauthorized user!",
    })
  }
}


// export const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if(!token) return res.status(401).json({
//     success : false,
//     message : "Unauthorized user!",
//   })

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//       res.status(401).json({
//       success : false,
//       message : "Unauthorized user!",
//     })
//   }
// }