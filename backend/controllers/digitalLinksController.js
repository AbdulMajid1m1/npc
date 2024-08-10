import Joi from "joi";
import prisma from "../prismaClient.js";
import { createError } from "../utils/createError.js";

// Define Joi schema for validation
const productStorageSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  gln: Joi.string().max(50).required(),
  gln_type: Joi.string().max(100).required(),
  quantity: Joi.number().integer().required(),
  storage_date: Joi.date().required(),
  expiration_date: Joi.date().optional(),
  batch_number: Joi.string().max(100).optional(),
  temperature_controlled: Joi.boolean().optional(),
  min_temperature: Joi.number().precision(2).optional(),
  max_temperature: Joi.number().precision(2).optional(),
  humidity_controlled: Joi.boolean().optional(),
  min_humidity: Joi.number().precision(2).optional(),
  max_humidity: Joi.number().precision(2).optional(),
  special_handling: Joi.string().optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).optional(),
});

export const createProductStorage = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productStorageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create product storage entry
    const newProductStorage = await prisma.productStorage.create({
      data: value,
    });

    res.status(201).json({
      message: "Product storage created successfully.",
      productStorage: newProductStorage,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateProductStorageSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  gln: Joi.string().max(50).optional(),
  gln_type: Joi.string().max(100).optional(),
  quantity: Joi.number().integer().optional(),
  storage_date: Joi.date().optional(),
  expiration_date: Joi.date().optional(),
  batch_number: Joi.string().max(100).optional(),
  temperature_controlled: Joi.boolean().optional(),
  min_temperature: Joi.number().precision(2).optional(),
  max_temperature: Joi.number().precision(2).optional(),
  humidity_controlled: Joi.boolean().optional(),
  min_humidity: Joi.number().precision(2).optional(),
  max_humidity: Joi.number().precision(2).optional(),
  special_handling: Joi.string().optional(),
  last_modified_by: Joi.string().max(255).required(),
});

export const updateProductStorage = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateProductStorageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update product storage entry
    const updatedProductStorage = await prisma.productStorage.update({
      where: { id },
      data: {
        ...value,
        last_modified_date: new Date(),
      },
    });

    res.json({
      message: "Product storage updated successfully.",
      productStorage: updatedProductStorage,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getProductStorage = async (req, res, next) => {
  try {
    // Define allowed columns for filtering
    const allowedColumns = {
      barcode: Joi.string(),
      gln: Joi.string(),
      gln_type: Joi.string(),
      batch_number: Joi.string(),
      temperature_controlled: Joi.boolean(),
      humidity_controlled: Joi.boolean(),
      special_handling: Joi.string(),
    };

    // Pagination schema
    const paginationSchema = Joi.object({
      page: Joi.number().integer().min(1),
      pageSize: Joi.number().integer().min(1),
    }).xor("page", "pageSize"); // Require both or neither

    // Combine schemas
    const filterSchema = Joi.object({
      ...allowedColumns,
      page: paginationSchema.extract("page").optional(),
      pageSize: paginationSchema.extract("pageSize").optional(),
    }).unknown(false); // Disallows any keys not defined in the schema

    // Validate the request query
    const { error, value } = filterSchema.validate(req.query);
    if (error) {
      return next(
        createError(400, `Invalid query parameter: ${error.details[0].message}`)
      );
    }

    // Construct filter conditions for Prisma query
    const filterConditions = {};
    Object.keys(value).forEach((key) => {
      if (!["page", "pageSize"].includes(key)) {
        filterConditions[key] = value[key];
      }
    });

    let productStorages;
    let totalProducts;

    // Determine whether to apply pagination
    if (value.page || value.pageSize) {
      if (!value.page || !value.pageSize) {
        return next(
          createError(400, "Both page and pageSize must be provided together.")
        );
      }

      // Apply pagination if both page and pageSize are provided
      const page = value.page;
      const pageSize = value.pageSize;

      // First, get the total count of product storages that match the filter conditions
      totalProducts = await prisma.productStorage.count({
        where: filterConditions,
      });

      // Then, get the paginated results
      productStorages = await prisma.productStorage.findMany({
        where: filterConditions,
        orderBy: { last_modified_date: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        productStorages,
      });
    } else {
      // No pagination: return all matching product storages in one page
      productStorages = await prisma.productStorage.findMany({
        where: filterConditions,
        orderBy: { last_modified_date: "desc" },
      });
      totalProducts = productStorages.length;

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        productStorages,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProductStorage = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete product storage entry
    await prisma.productStorage.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product storage deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
