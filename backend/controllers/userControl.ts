import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { generateRefreshToken, generateToken } from '../utils/generateToken';

const accessTokenMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

async function checkIfEmailExists(email: string): Promise<boolean> {
    try {
        const existingEmail = await User.findOne({ email });
        return existingEmail ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function userSignup(req: Request, res: Response) {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Name, phone, email, and password are required" });
        }

        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            return res.status(400).json({ message: "This email is already in use. Please use another one." });
        }
        const newUser = new User({
            fullName, email, password
        })

        const user = await newUser.save()

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        if (!token || !refreshToken) {
            return res.status(500).json({ message: "Error generating token" });
        }

        res
            .cookie("access_token", token, {
                maxAge: accessTokenMaxAge,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            .cookie("refresh_token", refreshToken, {
                maxAge: refreshTokenMaxAge,  // 7 days
                httpOnly: true,  // Prevent access to the cookie from client-side JS
                sameSite: "none",  // Necessary for cross-origin cookies
                secure: true,  // Ensure cookies are only sent over HTTPS
            });

        return res.status(200).json({
            success: true,
            message: 'Authentication Successful!',
            data: {
                _id: user._id,
                name: user.fullName,
                email: user.email,
            },
            token,
            refreshToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function userLogin(req: Request, res: Response) {
    try {
        console.log(req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        if (!token || !refreshToken) {
            return res.status(500).json({ message: "Error generating token" });
        }

        // Set cookies
        res
            .cookie("access_token", token, {
                maxAge: accessTokenMaxAge,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            .cookie("refresh_token", refreshToken, {
                maxAge: refreshTokenMaxAge,  // 7 days
                httpOnly: true,  // Prevent access to the cookie from client-side JS
                sameSite: "none",  // Necessary for cross-origin cookies
                secure: true,  // Ensure cookies are only sent over HTTPS
            });

        return res.status(200).json({
            success: true,
            message: 'Authentication Successful!',
            data: {
                _id: user._id,
                name: user.fullName,
                email: user.email,
            },
            token,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function logout(req: Request, res: Response) {
    try {
        res
            .cookie("access_token", "", {
                maxAge: 0,
            })
            .cookie("refresh_token", "", {
                maxAge: 0,
            });
        res
            .status(200)
            .json({ success: true, message: "user logout - clearing cookie" });
    } catch (error) {
        console.log(error);
    }
}

