import prisma from "../prismaClient.js";
import Joi from "joi";
import { gs1Prisma } from "../prismaMultiClinets.js";
import { sendEmail, sendMultipleEmails } from "../services/emailTemplates.js";
import bcrypt from "bcryptjs";
import { createError } from '../utils/createError.js';


const productRequest = Joi.object({
    brand_owner_user_id: Joi.string().max(255).required(),
    npc_user_id: Joi.string().max(255).required(),
    status: Joi.string().required(),
    barcode:Joi.string().max(255).required(),
  });

export const createproductRequest = async (req, res, next) => {
    try {
      const { error, value } = productRequest.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const unit = await prisma.productRequest.create({
        data: value,
      });
      res.status(201).json(unit);
    } catch (error) {
      next(error);
    }
  };