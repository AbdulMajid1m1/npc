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

      const totalPages = Math.ceil(totalProducts / pageSize);

      // Then, get the paginated results
      productStorages = await prisma.productStorage.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        totalPages: totalPages,
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
        totalPages: 1,
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

// product Content Controller

// Define Joi schema for validation
const productContentSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  ingredient_name: Joi.string().max(255).required(),
  ingredient_type: Joi.string().max(100).required(),
  quantity: Joi.number().precision(2).required(),
  unit_of_measure: Joi.string().max(50).required(),
  source: Joi.string().max(255).optional(),
  organic: Joi.boolean().optional(),
  allergen: Joi.boolean().optional(),
  gmo_status: Joi.string().max(50).optional(),
  nutritional_info: Joi.string().optional(),
  regulatory_compliance: Joi.string().max(255).optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
});

export const createProductContent = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productContentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create product content entry
    const newProductContent = await prisma.tblDlProductContents.create({
      data: value,
    });

    res.status(201).json({
      message: "Product content created successfully.",
      productContent: newProductContent,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateProductContentSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  ingredient_name: Joi.string().max(255).optional(),
  ingredient_type: Joi.string().max(100).optional(),
  quantity: Joi.number().precision(2).optional(),
  unit_of_measure: Joi.string().max(50).optional(),
  source: Joi.string().max(255).optional(),
  organic: Joi.boolean().optional(),
  allergen: Joi.boolean().optional(),
  gmo_status: Joi.string().max(50).optional(),
  nutritional_info: Joi.string().optional(),
  regulatory_compliance: Joi.string().max(255).optional(),
  last_modified_by: Joi.string().max(255).required(),
});

export const updateProductContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateProductContentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update product content entry
    const updatedProductContent = await prisma.tblDlProductContents.update({
      where: { id },
      data: {
        ...value,
        updated_at: new Date(),
      },
    });

    res.json({
      message: "Product content updated successfully.",
      productContent: updatedProductContent,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getProductContents = async (req, res, next) => {
  try {
    // Define allowed columns for filtering
    const allowedColumns = {
      barcode: Joi.string(),
      ingredient_name: Joi.string(),
      ingredient_type: Joi.string(),
      organic: Joi.boolean(),
      allergen: Joi.boolean(),
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

    let productContents;
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

      // First, get the total count of product contents that match the filter conditions
      totalProducts = await prisma.tblDlProductContents.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      // Then, get the paginated results
      productContents = await prisma.tblDlProductContents.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        totalPages: totalPages,
        productContents,
      });
    } else {
      // No pagination: return all matching product contents in one page
      productContents = await prisma.tblDlProductContents.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = productContents.length;

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        productContents,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProductContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete product content entry
    await prisma.tblDlProductContents.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product content deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// tblDlNutritionalInfo controller

// Define Joi schema for validation
const nutritionalInfoSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  serving_size: Joi.string().max(100).required(),
  calories: Joi.number().precision(2).required(),
  total_fat: Joi.number().precision(2).required(),
  saturated_fat: Joi.number().precision(2).optional(),
  trans_fat: Joi.number().precision(2).optional(),
  cholesterol: Joi.number().precision(2).optional(),
  sodium: Joi.number().precision(2).required(),
  total_carbohydrates: Joi.number().precision(2).required(),
  dietary_fiber: Joi.number().precision(2).optional(),
  sugars: Joi.number().precision(2).optional(),
  protein: Joi.number().precision(2).required(),
  vitamin_a: Joi.number().precision(2).optional(),
  vitamin_c: Joi.number().precision(2).optional(),
  calcium: Joi.number().precision(2).optional(),
  iron: Joi.number().precision(2).optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
});

export const createNutritionalInfo = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = nutritionalInfoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create nutritional info entry
    const newNutritionalInfo = await prisma.tblDlNutritionalInfo.create({
      data: value,
    });

    res
      .status(201)
      .json({
        message: "Nutritional info created successfully.",
        nutritionalInfo: newNutritionalInfo,
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateNutritionalInfoSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  serving_size: Joi.string().max(100).optional(),
  calories: Joi.number().precision(2).optional(),
  total_fat: Joi.number().precision(2).optional(),
  saturated_fat: Joi.number().precision(2).optional(),
  trans_fat: Joi.number().precision(2).optional(),
  cholesterol: Joi.number().precision(2).optional(),
  sodium: Joi.number().precision(2).optional(),
  total_carbohydrates: Joi.number().precision(2).optional(),
  dietary_fiber: Joi.number().precision(2).optional(),
  sugars: Joi.number().precision(2).optional(),
  protein: Joi.number().precision(2).optional(),
  vitamin_a: Joi.number().precision(2).optional(),
  vitamin_c: Joi.number().precision(2).optional(),
  calcium: Joi.number().precision(2).optional(),
  iron: Joi.number().precision(2).optional(),
  last_modified_by: Joi.string().max(255).required(),
});

export const updateNutritionalInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateNutritionalInfoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update nutritional info entry
    const updatedNutritionalInfo = await prisma.tblDlNutritionalInfo.update({
      where: { id },
      data: {
        ...value,
        updated_at: new Date(),
      },
    });

    res.json({
      message: "Nutritional info updated successfully.",
      nutritionalInfo: updatedNutritionalInfo,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const filterSchema = Joi.object({
    barcode: Joi.string().max(50).optional(),
    serving_size: Joi.string().max(100).optional(),
    calories: Joi.number().precision(2).optional(),
    total_fat: Joi.number().precision(2).optional(),
    protein: Joi.number().precision(2).optional(),
    page: Joi.number().integer().min(1).optional(),
    pageSize: Joi.number().integer().min(1).optional(),
  }).and("page", "pageSize"); // Require both or neither
  
  export const getNutritionalInfo = async (req, res, next) => {
    try {
      // Validate query parameters
      const { error, value } = filterSchema.validate(req.query);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const filterConditions = {};
      Object.keys(value).forEach((key) => {
        if (!["page", "pageSize"].includes(key)) {
          filterConditions[key] = value[key];
        }
      });
  
      let nutritionalInfo;
      let totalProducts;
  
      if (value.page || value.pageSize) {
        if (!value.page || !value.pageSize) {
          return next(
            createError(400, "Both page and pageSize must be provided together.")
          );
        }
  
        const page = value.page;
        const pageSize = value.pageSize;
  
        totalProducts = await prisma.tblDlNutritionalInfo.count({
          where: filterConditions,
        });
  
        const totalPages = Math.ceil(totalProducts / pageSize);
  
        nutritionalInfo = await prisma.tblDlNutritionalInfo.findMany({
          where: filterConditions,
          orderBy: { updated_at: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
  
        return res.json({
          currentPage: page,
          pageSize: pageSize,
          totalProducts: totalProducts,
          totalPages: totalPages,
          nutritionalInfo,
        });
      } else {
        nutritionalInfo = await prisma.tblDlNutritionalInfo.findMany({
          where: filterConditions,
          orderBy: { updated_at: "desc" },
        });
        totalProducts = nutritionalInfo.length;
  
        return res.json({
          currentPage: 1,
          pageSize: totalProducts, // The size of the entire result set
          totalProducts: totalProducts,
          totalPages: 1,
          nutritionalInfo,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  

export const deleteNutritionalInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete nutritional info entry
    await prisma.tblDlNutritionalInfo.delete({
      where: { id },
    });

    res.status(200).json({ message: "Nutritional info deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
