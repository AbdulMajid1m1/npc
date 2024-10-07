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
  export const getAllProductRequests = async (req, res, next) => {
    try {
      const productRequests = await prisma.productRequest.findMany();
      res.status(200).json(productRequests);
    } catch (error) {
      next(error);
    }
  };
  export const getProductRequestsByNpcUserId = async (req, res, next) => {
    try {
      const { npc_user_id } = req.params;
  
      const productRequests = await prisma.productRequest.findMany({
        where: {
          npc_user_id: npc_user_id // Ensure npc_user_id is of the correct type (e.g., integer)
        },
      });
  
      if (productRequests.length === 0) {
        return res.status(404).json({ message: 'No product requests found for this user.' });
      }
  
      res.status(200).json(productRequests);
    } catch (error) {
      next(error);
    }
  };
 

  export const updateProductRequestStatus = async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error: idError } = schema.validate(req.params);
      if (idError) {
        return next(createError(400, idError.details[0].message));
      }
  
      const { id } = req.params;
  
      const { error } = productRequest.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { brand_owner_user_id, npc_user_id, status,barcode } = req.body;
      const updatedUNSPSC = await prisma.productRequest.update({
        where: { id: id },
        data: {
          brand_owner_user_id,
          npc_user_id,
          status,
          barcode
        },
      });
  
      res.json(updatedUNSPSC);
    } catch (error) {
      next(error);
    }
  };
  export const searchproductRequest = async (req, res, next) => {
    try {
        const { query } = req.query;
    
        // Ensure the query parameter is provided
        if (!query) {
          return res.status(400).json({ message: 'Query parameter is required' });
        }
    
        const productRequests = await gs1Prisma.products.findMany({
          where: {
            OR: [
              {
                productnameenglish: {
                  contains: query,
                },
              },
              {
                productnamearabic: {
                  contains: query,
                },
              },
              {
                BrandName: {
                  contains: query,
                },
              },
              {
                BrandNameAr: {
                  contains: query,
                },
              },
              {
                HsDescription: {
                  contains: query,
                },
              },
            ],
          },
        });
    
        if (productRequests.length === 0) {
          return res.status(404).json({ message: 'No product found' });
        }
    
        res.status(200).json(productRequests);
      }  catch (error) {
      next(error);
    }
  };
  
  