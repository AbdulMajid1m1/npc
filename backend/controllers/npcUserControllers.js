import Joi from "joi";
import bcrypt from "bcrypt";
import prisma from "../prismaClient.js";
import { createError } from "../utils/createError.js";
import { JWT_EXPIRATION, MEMBER_JWT_SECRET } from "../configs/envConfig.js";
import jwt from "jsonwebtoken";


// Define Joi schema for validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginNpcUser = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    // Check if the user exists
    const user = await prisma.npcUsers.findFirst({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password." });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, user_type: user.user_type },
      MEMBER_JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    // Return the token and user information
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const valid_user_types = [
  "subscriber",
  "dqms",
  "governance",
  "compliance",
  "solutions_provider",
  "gs1_community_partners",
];

// Define Joi schema for validation
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  user_type: Joi.string()
    .valid(...valid_user_types)
    .required(),
  image: Joi.string().optional(),
  mobile: Joi.string().optional(),
});

export const registerNpcUser = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, user_type, mobile } = value;

    // Check if the user already exists
    const existingUser = await prisma.npcUsers.findFirst({ where: { email } });
    if (existingUser) {
      throw createError(400, "User with this email already exists.");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Process image if uploaded
    let imagePath = null;
    if (req.files && req.files.profilePicture) {
      imagePath = req.files.profilePicture[0].path.replace("public", "");
    }

    // Create the NPC user
    const newUser = await prisma.npcUsers.create({
      data: {
        username,
        email,
        password: hashedPassword,
        user_type,
        image: imagePath,
        mobile,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  user_type: Joi.string()
    .valid(...valid_user_types)
    .optional(),
  image: Joi.string().optional(),
  mobile: Joi.string().optional(),
});

export const updateNpcUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate request body
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, user_type, mobile } = value;

    // Check if the user exists
    const existingUser = await prisma.npcUsers.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Prepare update data
    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (user_type) updateData.user_type = user_type;
    if (mobile) updateData.mobile = mobile;
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    // Process image if uploaded
    let imagePath = null;
    if (req.files && req.files.profilePicture) {
      imagePath = req.files.profilePicture[0].path.replace("public", "");
      updateData.image = imagePath;
    }

    // Update the NPC user
    await prisma.npcUsers.update({
      where: { id: userId },
      data: updateData,
    });

    res.json({ message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getNpcUsers = async (req, res, next) => {
  try {
    // Define allowed columns for filtering
    const allowedColumns = {
      id: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      user_type: Joi.string(),
      image: Joi.string(),
      mobile: Joi.string(),
      created_at: Joi.date(),
      updated_at: Joi.date(),
    };

    // Create a dynamic schema based on the allowed columns
    const filterSchema = Joi.object(
      Object.keys(allowedColumns).reduce((schema, column) => {
        schema[column] = allowedColumns[column];
        return schema;
      }, {})
    ).unknown(false); // Disallows any keys not defined in the schema

    // Validate the request query
    const { error, value } = filterSchema.validate(req.query);
    if (error) {
      return res.status(400).send({
        message: `Invalid query parameter: ${error.details[0].message}`,
      });
    }

    // Prepare filter conditions
    const filterConditions =
      Object.keys(value).length > 0
        ? Object.keys(value).reduce((obj, key) => {
            obj[key] = value[key];
            return obj;
          }, {})
        : {};

    // Construct the Prisma select object
    const select = Object.keys(allowedColumns).reduce((obj, col) => {
      obj[col] = true;
      return obj;
    }, {});

    const npcUsers = await prisma.npcUsers.findMany({
      where: filterConditions,
      select,
      orderBy: {
        updated_at: "desc",
      },
    });

    return res.json(npcUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const deleteNpcUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await prisma.npcUsers.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the user
    await prisma.npcUsers.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
