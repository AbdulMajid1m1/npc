import prisma from "../prismaClient.js";
import Joi from "joi";
import { gs1Prisma } from "../prismaMultiClinets.js";

export const npcLogin = async (req, res, next) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Find user by email
    const user = await gs1Prisma.users.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      // User not found
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user_id = user.id;
    const findgln = await gs1Prisma.add_member_gln_products.findMany({
      where: {
        user_id: user_id,
      },
    });
    const glnNumbers = findgln.map((entry) => ({
      gln: entry.GLNBarcodeNumber,
      location: entry.locationNameEn,
    }));

    // Password is valid, login successful
    res.json({
      message: "Login successful",
      user_id: user.id,
      gln: glnNumbers,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    next(error);
  }
};
export const verifyGln = async (req, res, next) => {
  const { user_id, GLNBarcodeNumber } = req.body; // Extract user_id and password from request body
  try {
    // Find user by user_id
    const user = await gs1Prisma.add_member_gln_products.findFirst({
      where: {
        user_id: user_id,
        GLNBarcodeNumber: GLNBarcodeNumber,
      },
    });

    if (!user) {
      // User not found
      return res
        .status(401)
        .json({ message: "Invalid email or password or gln" });
    }

    // Password is valid, login successful
    res.json({ message: "Login successful", user: user });
  } catch (error) {
    next(error);
  }
};
