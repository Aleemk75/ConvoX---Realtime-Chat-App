import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJwt } from "../../utils/generate.jwt.js";
import cloudinary from "../lib/cloudinary.js"


export async function signup(req, res, next) {
    try {
        let { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters" })
        }

        let isvalidEmail = await User.findOne({ email });
        if (isvalidEmail) {
            return res.status(400).json({ message: "Invalid email" })
        }
        let salt = await bcrypt.genSalt(10);
        let haspassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: haspassword
        })

        if (newUser) {
            //generate token 
            let token = generateJwt(newUser._id, res);
            console.log(token);

            await newUser.save();
            res.status(201).json({ newUser, token });
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("error! signup controller", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export async function login(req, res, next) {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide credentials" })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        if (await bcrypt.compare(password, user.password)) {
            let token = generateJwt(user._id, res);
            console.log(token);
            return res.status(200).json({ message: "Logged In Successfully", token })
        }
        return res.status(400).json({ message: "Invalid credentials!" })
    } catch (error) {
        console.log("error! login controller", error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}


export async function logout(req, res, next) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        console.log("error! logout controller", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export function checkAuth(req, res) {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in Check Auth controller :", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}