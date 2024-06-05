import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import UserModel from "./User.model";
import { AuthRequest } from "../../middleware/auth/authMiddleware";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find().lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({ token: user.generateToken() });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  res.json(user);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, phoneNumber, role } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists with this email");
  }

  const user = new UserModel({ name, email, password, phoneNumber, role });

  try {
    await user.save();
    res.json({
      message: "User created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { name, email, password, phoneNumber } = req.body;
    const { id } = req.params;

    if (user?._id.toString() !== id) {
      return res.status(403).send("Unauthorized to update this user");
    }

    const userToUpdate = await UserModel.findById(id);
    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }

    // Update user information
    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email;
    if (phoneNumber) userToUpdate.phoneNumber = phoneNumber;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }

    await userToUpdate.save();
    res
      .status(200)
      .json({ message: "User updated successfully", user: userToUpdate });
  } catch (err) {
    next(err);
  }
};

export { login, getCurrentUser, register, updateUser, getUsers };
