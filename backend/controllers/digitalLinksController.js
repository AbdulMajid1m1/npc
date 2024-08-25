import Joi from "joi";
import prisma from "../prismaClient.js";
import { createError } from "../utils/createError.js";

const updateTblWflCompliance = async (barcode) => {
  // Check if there is an existing compliance record
  let complianceRecord = await prisma.tblWflCompliance.findFirst({
    where: { barcode },
  });

  // Fetch the first relevant active record based on barcode
  const productStorageRecord = await prisma.productStorage.findFirst({
    where: { barcode, status: "active" },
  });
  const foodProductSafetyRecord = await prisma.tblDlFoodProductSafety.findFirst(
    {
      where: { barcode, status: "active" },
    }
  );
  const productContentRecord = await prisma.tblDlProductContents.findFirst({
    where: { barcode, status: "active" },
  });
  const packagingRecord = await prisma.tblDlPackaging.findFirst({
    where: { barcode, status: "active" },
  });

  // console.log("productStorageRecord", productStorageRecord);
  // console.log("foodProductSafetyRecord", foodProductSafetyRecord);
  // console.log("productContentRecord", productContentRecord);
  // console.log("packagingRecord", packagingRecord);

  // Check if all fetched records are found (and thus active)
  const isCompliant =
    Boolean(productStorageRecord) &&
    Boolean(foodProductSafetyRecord) &&
    Boolean(productContentRecord) &&
    Boolean(packagingRecord);

  console.log("isCompliant", isCompliant);

  if (!complianceRecord) {
    // Create a new compliance record if it doesn't exist
    complianceRecord = await prisma.tblWflCompliance.create({
      data: {
        barcode,
        is_compliance: isCompliant,
      },
    });
  } else {
    // If a compliance record exists, update it based on the new conditions
    await prisma.tblWflCompliance.update({
      where: { id: complianceRecord.id },
      data: {
        is_compliance: isCompliant,
      },
    });
  }

  return complianceRecord;
};

// Reusable function to check and update tblWflDqms
const updateTblWflDqms = async (barcode, qualityMarkId, fieldToUpdate) => {
  // Find the first record with the matching barcode
  let dqmsRecord = await prisma.tblWflDqms.findFirst({
    where: { barcode },
  });

  if (!dqmsRecord) {
    // If no record is found, create a new one with is_dqms_compliant set to false by default
    dqmsRecord = await prisma.tblWflDqms.create({
      data: {
        barcode,
        [fieldToUpdate]: qualityMarkId,
        is_dqms_compliant: false,
      },
    });
  } else {
    // Update the matching records with the new qualityMarkId
    await prisma.tblWflDqms.updateMany({
      where: { barcode },
      data: {
        [fieldToUpdate]: qualityMarkId,
      },
    });

    // Re-check the updated record to see if all required fields are non-null and non-empty
    dqmsRecord = await prisma.tblWflDqms.findFirst({
      where: { barcode },
    });

    // If all required fields have values, set is_dqms_compliant to true
    if (
      dqmsRecord.saso &&
      dqmsRecord.qmark &&
      dqmsRecord.iecce &&
      dqmsRecord.efficiency
    ) {
      await prisma.tblWflDqms.updateMany({
        where: { barcode },
        data: {
          is_dqms_compliant: true,
        },
      });
    }
  }

  return dqmsRecord;
};

// NPC Barcode Documents status controller

// Define the barcode validation schema
const barcodeSchema = Joi.object({
  barcode: Joi.string().max(14).required(),
});

export const getComplianceAndDqmsStatus = async (req, res, next) => {
  try {
    // Get the barcode from the query parameters
    const { barcode } = req.query;

    // Validate the barcode
    const { error } = barcodeSchema.validate({ barcode });
    if (error) {
      return res
        .status(400)
        .json({ error: `Invalid barcode: ${error.details[0].message}` });
    }

    // Fetch DQMS data
    const dqmsRecord = await prisma.tblWflDqms.findFirst({
      where: { barcode },
    });

    const isSasoCompliant = Boolean(dqmsRecord?.saso);
    const isQmarkCompliant = Boolean(dqmsRecord?.qmark);
    const isIecceCompliant = Boolean(dqmsRecord?.iecce);
    const isEfficiencyCompliant = Boolean(dqmsRecord?.efficiency);
    const isDqmsCompliant = dqmsRecord?.is_dqms_compliant || false;
    const dqmsStatus = isDqmsCompliant ? "Compliant" : "Non Compliant";

    // Fetch Compliance data
    const complianceRecord = await prisma.tblWflCompliance.findFirst({
      where: { barcode },
    });

    const isCompliant = complianceRecord?.is_compliance || false;
    const complianceStatus = isCompliant ? "Compliant" : "Non Compliant";

    // Fetch related data for compliance check
    const productStorageRecord = await prisma.productStorage.findFirst({
      where: { barcode, status: "active" },
    });

    const foodProductSafetyRecord =
      await prisma.tblDlFoodProductSafety.findFirst({
        where: { barcode, status: "active" },
      });

    const productContentRecord = await prisma.tblDlProductContents.findFirst({
      where: { barcode, status: "active" },
    });

    const packagingRecord = await prisma.tblDlPackaging.findFirst({
      where: { barcode, status: "active" },
    });

    // Construct the response object for the client
    const response = {
      dqms: {
        is_dqms_compliant: isDqmsCompliant,
        saso: isSasoCompliant,
        qmark: isQmarkCompliant,
        iecce: isIecceCompliant,
        efficiency: isEfficiencyCompliant,
        dqmsStatus: dqmsStatus,
      },
      compliance: {
        is_compliance: isCompliant,
        complianceStatus: complianceStatus,
        productStorage: Boolean(productStorageRecord),
        foodProductSafety: Boolean(foodProductSafetyRecord),
        productContents: Boolean(productContentRecord),
        packaging: Boolean(packagingRecord),
      },
    };

    // Send the response
    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching DQMS and Compliance status:", err.message);
    next(err); // Pass the error to the next middleware for error handling
  }
};

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
  status: Joi.string().max(50).default("active"), // Default to "active"
  domainName: Joi.string().max(1000).required(),
});

export const createProductStorage = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productStorageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create product storage entry
    const newProductStorage = await prisma.productStorage.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update the compliance status in tblWflCompliance
    await updateTblWflCompliance(value.barcode);

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
  domainName: Joi.string().optional(),
});

export const updateProductStorage = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body.
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
    if (value.page && value.pageSize) {
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

      // Parse images field if present
      const parsedProductStorages = productStorages.map((storage) => ({
        ...storage,
        images: storage.images ? JSON.parse(storage.images) : [],
      }));

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        totalPages: totalPages,
        productStorages: parsedProductStorages,
      });
    } else {
      // No pagination: return all matching product storages in one page
      productStorages = await prisma.productStorage.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = productStorages.length;

      // Parse images field if present
      const parsedProductStorages = productStorages.map((storage) => ({
        ...storage,
        images: storage.images ? JSON.parse(storage.images) : [],
      }));

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        productStorages: parsedProductStorages,
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
  status: Joi.string().max(50).default("active"),
  domainName: Joi.string().required(),
});

export const createProductContent = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productContentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create product content entry
    const newProductContent = await prisma.tblDlProductContents.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update compliance status in tblWflCompliance
    await updateTblWflCompliance(value.barcode);

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
  domainName: Joi.string().optional(),
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

      // Parse images field if present
      const parsedProductContents = productContents.map((content) => ({
        ...content,
        images: content.images ? JSON.parse(content.images) : [],
      }));

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        totalPages: totalPages,
        productContents: parsedProductContents,
      });
    } else {
      // No pagination: return all matching product contents in one page
      productContents = await prisma.tblDlProductContents.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = productContents.length;

      // Parse images field if present
      const parsedProductContents = productContents.map((content) => ({
        ...content,
        images: content.images ? JSON.parse(content.images) : [],
      }));

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        productContents: parsedProductContents,
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
  domainName: Joi.string().required(),
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

    res.status(201).json({
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
  domainName: Joi.string().optional(),
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

// tbDlAllergens Controller

// Define Joi schema for validation
const allergenSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  allergen_name: Joi.string().max(255).required(),
  allergen_type: Joi.string().max(100).required(),
  contains_allergen: Joi.boolean().required(),
  may_contain: Joi.boolean().required(),
  cross_contamination_risk: Joi.boolean().required(),
  allergen_source: Joi.string().max(255).optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().required(),
});

export const createAllergen = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = allergenSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create allergen entry
    const newAllergen = await prisma.tbDlAllergens.create({
      data: value,
    });

    res.status(201).json({
      message: "Allergen created successfully.",
      allergen: newAllergen,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateAllergenSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  allergen_name: Joi.string().max(255).optional(),
  allergen_type: Joi.string().max(100).optional(),
  contains_allergen: Joi.boolean().optional(),
  may_contain: Joi.boolean().optional(),
  cross_contamination_risk: Joi.boolean().optional(),
  allergen_source: Joi.string().max(255).optional(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().optional(),
});

export const updateAllergen = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateAllergenSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update allergen entry
    const updatedAllergen = await prisma.tbDlAllergens.update({
      where: { id },
      data: {
        ...value,
        updated_at: new Date(),
      },
    });

    res.json({
      message: "Allergen updated successfully.",
      allergen: updatedAllergen,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const tbDlAllergensFilterSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  allergen_name: Joi.string().max(255).optional(),
  allergen_type: Joi.string().max(100).optional(),
  contains_allergen: Joi.boolean().optional(),
  may_contain: Joi.boolean().optional(),
  cross_contamination_risk: Joi.boolean().optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
}).and("page", "pageSize"); // Require both or neither

export const getAllergens = async (req, res, next) => {
  try {
    // Validate query parameters
    const { error, value } = tbDlAllergensFilterSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filterConditions = {};
    Object.keys(value).forEach((key) => {
      if (!["page", "pageSize"].includes(key)) {
        filterConditions[key] = value[key];
      }
    });

    let allergens;
    let totalProducts;

    if (value.page || value.pageSize) {
      if (!value.page || !value.pageSize) {
        return next(
          createError(400, "Both page and pageSize must be provided together.")
        );
      }

      const page = value.page;
      const pageSize = value.pageSize;

      totalProducts = await prisma.tbDlAllergens.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      allergens = await prisma.tbDlAllergens.findMany({
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
        allergens,
      });
    } else {
      allergens = await prisma.tbDlAllergens.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = allergens.length;

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        allergens,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteAllergen = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the allergen exists
    const allergen = await prisma.tbDlAllergens.findUnique({
      where: { id },
    });

    if (!allergen) {
      throw createError(404, "Allergen not found for the given ID.");
    }

    // Delete allergen entry
    await prisma.tbDlAllergens.delete({
      where: { id },
    });

    res.status(200).json({ message: "Allergen deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// .... certification controller ....

// Define Joi schema for validation
const productQualityMarkSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  quality_mark: Joi.string().max(255).required(),
  issuing_authority: Joi.string().max(255).required(),
  issue_date: Joi.date().required(),
  expiry_date: Joi.date().optional(),
  status: Joi.string().max(50).required(),
  scope: Joi.string().max(255).optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().required(),
});

export const createProductQualityMark = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productQualityMarkSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create product quality mark entry
    const newProductQualityMark = await prisma.tblDlProductQualityMark.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Check and update tblWflDqms
    await updateTblWflDqms(value.barcode, newProductQualityMark.id, "qmark");

    res.status(201).json({
      message: "Product quality mark created successfully.",
      qualityMark: newProductQualityMark,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateProductQualityMarkSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  quality_mark: Joi.string().max(255).optional(),
  issuing_authority: Joi.string().max(255).optional(),
  issue_date: Joi.date().optional(),
  expiry_date: Joi.date().optional(),
  status: Joi.string().max(50).optional(),
  scope: Joi.string().max(255).optional(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().optional(),
});

export const updateProductQualityMark = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateProductQualityMarkSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update product quality mark entry
    const updatedProductQualityMark =
      await prisma.tblDlProductQualityMark.update({
        where: { id },
        data: {
          ...value,
          updated_at: new Date(),
        },
      });

    res.json({
      message: "Product quality mark updated successfully.",
      qualityMark: updatedProductQualityMark,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Define Joi schema for validation
const tblDlProductQualityMarkFilterSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  quality_mark: Joi.string().max(255).optional(),
  issuing_authority: Joi.string().max(255).optional(),
  status: Joi.string().max(50).optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
}).and("page", "pageSize"); // Require both or neither

export const getProductQualityMarks = async (req, res, next) => {
  try {
    // Validate query parameters
    const { error, value } = tblDlProductQualityMarkFilterSchema.validate(
      req.query
    );
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filterConditions = {};
    Object.keys(value).forEach((key) => {
      if (!["page", "pageSize"].includes(key)) {
        filterConditions[key] = value[key];
      }
    });

    let qualityMarks;
    let totalProducts;

    if (value.page || value.pageSize) {
      if (!value.page || !value.pageSize) {
        return next(
          createError(400, "Both page and pageSize must be provided together.")
        );
      }

      const page = value.page;
      const pageSize = value.pageSize;

      totalProducts = await prisma.tblDlProductQualityMark.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      qualityMarks = await prisma.tblDlProductQualityMark.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    } else {
      qualityMarks = await prisma.tblDlProductQualityMark.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = qualityMarks.length;
    }

    // Parse attachments (images) if any
    const parsedQualityMarks = qualityMarks.map((mark) => ({
      ...mark,
      images: mark.images ? JSON.parse(mark.images) : [],
    }));

    return res.json({
      currentPage: value.page || 1,
      pageSize: value.pageSize || totalProducts, // The size of the entire result set if no pagination
      totalProducts: totalProducts,
      totalPages: value.pageSize
        ? Math.ceil(totalProducts / value.pageSize)
        : 1,
      qualityMarks: parsedQualityMarks,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProductQualityMark = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the product quality mark exists
    const qualityMark = await prisma.tblDlProductQualityMark.findUnique({
      where: { id },
    });

    if (!qualityMark) {
      return res.status(404).json({ error: "Product quality mark not found." });
    }

    // Delete product quality mark entry
    await prisma.tblDlProductQualityMark.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Product quality mark deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// tblDlEfficiencyLabels Controller

const efficiencyLabelSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  label_type: Joi.string().max(255).required(),
  rating: Joi.string().max(50).required(),
  issued_by: Joi.string().max(255).required(),
  issue_date: Joi.date().required(),
  valid_until: Joi.date().optional(),
  scope: Joi.string().max(255).optional(),
  details: Joi.string().optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().required(),
});

export const createEfficiencyLabel = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = efficiencyLabelSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create efficiency label entry
    const newEfficiencyLabel = await prisma.tblDlEfficiencyLabels.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update the efficiency column in tblWflDqms with the new efficiency label ID
    await updateTblWflDqms(value.barcode, newEfficiencyLabel.id, "efficiency");

    res.status(201).json({
      message: "Efficiency label created successfully.",
      efficiencyLabel: newEfficiencyLabel,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateEfficiencyLabelSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  label_type: Joi.string().max(255).optional(),
  rating: Joi.string().max(50).optional(),
  issued_by: Joi.string().max(255).optional(),
  issue_date: Joi.date().optional(),
  valid_until: Joi.date().optional(),
  scope: Joi.string().max(255).optional(),
  details: Joi.string().optional(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().optional(),
});

export const updateEfficiencyLabel = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateEfficiencyLabelSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update efficiency label entry
    const updatedEfficiencyLabel = await prisma.tblDlEfficiencyLabels.update({
      where: { id },
      data: {
        ...value,
        updated_at: new Date(),
      },
    });

    res.json({
      message: "Efficiency label updated successfully.",
      efficiencyLabel: updatedEfficiencyLabel,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const tblDlEfficiencyLabelsFilterSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  label_type: Joi.string().max(255).optional(),
  rating: Joi.string().max(50).optional(),
  issued_by: Joi.string().max(255).optional(),
  status: Joi.string().max(50).optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
}).and("page", "pageSize"); // Require both or neither

export const getEfficiencyLabels = async (req, res, next) => {
  try {
    // Validate query parameters
    const { error, value } = tblDlEfficiencyLabelsFilterSchema.validate(
      req.query
    );
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filterConditions = {};
    Object.keys(value).forEach((key) => {
      if (!["page", "pageSize"].includes(key)) {
        filterConditions[key] = value[key];
      }
    });

    let efficiencyLabels;
    let totalProducts;

    if (value.page || value.pageSize) {
      if (!value.page || !value.pageSize) {
        return next(
          createError(400, "Both page and pageSize must be provided together.")
        );
      }

      const page = value.page;
      const pageSize = value.pageSize;

      totalProducts = await prisma.tblDlEfficiencyLabels.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      efficiencyLabels = await prisma.tblDlEfficiencyLabels.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    } else {
      efficiencyLabels = await prisma.tblDlEfficiencyLabels.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = efficiencyLabels.length;
    }

    // Parse attachments (images) if any
    const parsedEfficiencyLabels = efficiencyLabels.map((label) => ({
      ...label,
      images: label.images ? JSON.parse(label.images) : [],
    }));

    return res.json({
      currentPage: value.page || 1,
      pageSize: value.pageSize || totalProducts, // The size of the entire result set if no pagination
      totalProducts: totalProducts,
      totalPages: value.pageSize
        ? Math.ceil(totalProducts / value.pageSize)
        : 1,
      efficiencyLabels: parsedEfficiencyLabels,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteEfficiencyLabel = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the efficiency label exists
    const efficiencyLabel = await prisma.tblDlEfficiencyLabels.findUnique({
      where: { id },
    });

    if (!efficiencyLabel) {
      return res.status(404).json({ error: "Efficiency label not found." });
    }

    // Delete efficiency label entry
    await prisma.tblDlEfficiencyLabels.delete({
      where: { id },
    });

    res.status(200).json({ message: "Efficiency label deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ........... tblDlProductConformity Controller ...........

// Define Joi schema for validation
const productConformitySchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  certificate_name: Joi.string().max(255).required(),
  issued_by: Joi.string().max(255).required(),
  issue_date: Joi.date().required(),
  expiry_date: Joi.date().optional(),
  standard_met: Joi.string().max(255).optional(),
  details: Joi.string().optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().required(),
});

export const createProductConformity = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productConformitySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create product conformity entry
    const newProductConformity = await prisma.tblDlProductConformity.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update the saso column in tblWflDqms with the new product conformity ID
    await updateTblWflDqms(value.barcode, newProductConformity.id, "saso");

    res.status(201).json({
      message: "Product conformity created successfully.",
      productConformity: newProductConformity,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateProductConformitySchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  certificate_name: Joi.string().max(255).optional(),
  issued_by: Joi.string().max(255).optional(),
  issue_date: Joi.date().optional(),
  expiry_date: Joi.date().optional(),
  standard_met: Joi.string().max(255).optional(),
  details: Joi.string().optional(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().optional(),
});

export const updateProductConformity = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateProductConformitySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update product conformity entry
    const updatedProductConformity = await prisma.tblDlProductConformity.update(
      {
        where: { id },
        data: {
          ...value,
          updated_at: new Date(),
        },
      }
    );

    res.json({
      message: "Product conformity updated successfully.",
      productConformity: updatedProductConformity,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const productConformityFilterSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  certificate_name: Joi.string().max(255).optional(),
  issued_by: Joi.string().max(255).optional(),
  standard_met: Joi.string().max(255).optional(),
  details: Joi.string().optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
}).and("page", "pageSize"); // Require both or neither

export const getProductConformities = async (req, res, next) => {
  try {
    // Validate query parameters using the productConformityFilterSchema
    const { error, value } = productConformityFilterSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filterConditions = {};
    Object.keys(value).forEach((key) => {
      if (!["page", "pageSize"].includes(key)) {
        filterConditions[key] = value[key];
      }
    });

    let productConformities;
    let totalProducts;

    if (value.page && value.pageSize) {
      const page = value.page;
      const pageSize = value.pageSize;

      totalProducts = await prisma.tblDlProductConformity.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      productConformities = await prisma.tblDlProductConformity.findMany({
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
        productConformities,
      });
    } else {
      productConformities = await prisma.tblDlProductConformity.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = productConformities.length;

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        productConformities,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProductConformity = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the product conformity exists
    const productConformity = await prisma.tblDlProductConformity.findUnique({
      where: { id },
    });

    if (!productConformity) {
      return res.status(404).json({ error: "Product conformity not found." });
    }

    // Delete product conformity entry
    await prisma.tblDlProductConformity.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Product conformity deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ....... tblDlIeceeCertificate Controller .......

// Define Joi schema for validation
const ieceeCertificateSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  certificate_number: Joi.string().max(255).required(),
  issue_date: Joi.date().required(),
  expiry_date: Joi.date().optional(),
  issued_by: Joi.string().max(255).required(),
  standard_met: Joi.string().max(255).required(),
  status: Joi.string().max(100).required(),
  scope: Joi.string().optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().required(),
});

export const createIeceeCertificate = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = ieceeCertificateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create IECEE certificate entry
    const newIeceeCertificate = await prisma.tblDlIeceeCertificate.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update the iecce column in tblWflDqms with the new IECEE certificate ID
    await updateTblWflDqms(value.barcode, newIeceeCertificate.id, "iecce");

    res.status(201).json({
      message: "IECEE certificate created successfully.",
      ieceeCertificate: newIeceeCertificate,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateIeceeCertificateSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  certificate_number: Joi.string().max(255).optional(),
  issue_date: Joi.date().optional(),
  expiry_date: Joi.date().optional(),
  issued_by: Joi.string().max(255).optional(),
  standard_met: Joi.string().max(255).optional(),
  status: Joi.string().max(100).optional(),
  scope: Joi.string().optional(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().optional(),
});

export const updateIeceeCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateIeceeCertificateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update IECEE certificate entry
    const updatedIeceeCertificate = await prisma.tblDlIeceeCertificate.update({
      where: { id },
      data: {
        ...value,
        updated_at: new Date(),
      },
    });

    res.json({
      message: "IECEE certificate updated successfully.",
      ieceeCertificate: updatedIeceeCertificate,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const ieceeCertificateFilterSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  certificate_number: Joi.string().max(255).optional(),
  issued_by: Joi.string().max(255).optional(),
  standard_met: Joi.string().max(255).optional(),
  status: Joi.string().max(100).optional(),
  scope: Joi.string().optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
}).with("page", "pageSize"); // Ensure 'page' and 'pageSize' are either both present or both absent

export const getIeceeCertificates = async (req, res, next) => {
  try {
    // Validate query parameters using the ieceeCertificateFilterSchema
    const { error, value } = ieceeCertificateFilterSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filterConditions = {};
    Object.keys(value).forEach((key) => {
      if (!["page", "pageSize"].includes(key)) {
        filterConditions[key] = value[key];
      }
    });

    let ieceeCertificates;
    let totalProducts;

    if (value.page && value.pageSize) {
      // Pagination is provided, fetch paginated data
      const page = value.page;
      const pageSize = value.pageSize;

      totalProducts = await prisma.tblDlIeceeCertificate.count({
        where: filterConditions,
      });

      ieceeCertificates = await prisma.tblDlIeceeCertificate.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    } else {
      // No pagination provided, fetch all data
      ieceeCertificates = await prisma.tblDlIeceeCertificate.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = ieceeCertificates.length;
    }

    // Parse attachments (images) if any
    const parsedIeceeCertificates = ieceeCertificates.map((certificate) => ({
      ...certificate,
      images: certificate.images ? JSON.parse(certificate.images) : [],
    }));

    return res.json({
      currentPage: value.page || 1,
      pageSize: value.pageSize || totalProducts, // The size of the entire result set if no pagination
      totalProducts: totalProducts,
      totalPages: value.pageSize
        ? Math.ceil(totalProducts / value.pageSize)
        : 1,
      ieceeCertificates: parsedIeceeCertificates,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteIeceeCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the IECEE certificate exists
    const ieceeCertificate = await prisma.tblDlIeceeCertificate.findUnique({
      where: { id },
    });

    if (!ieceeCertificate) {
      return res.status(404).json({ error: "IECEE certificate not found." });
    }

    // Delete IECEE certificate entry
    await prisma.tblDlIeceeCertificate.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "IECEE certificate deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// tblDlFoodProductSafety Controller
const foodProductSafetySchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  batch_number: Joi.string().max(100).required(),
  manufacture_date: Joi.date().required(),
  expiry_date: Joi.date().required(),
  supplier_id: Joi.number().integer().optional(),
  inspection_date: Joi.date().optional(),
  inspection_result: Joi.string().max(100).optional(),
  issue_detected: Joi.boolean().optional(),
  issue_description: Joi.string().optional(),
  corrective_action: Joi.string().optional(),
  status: Joi.string().max(100).default("active"),
  recall_date: Joi.date().optional(),
  regulatory_compliance: Joi.string().max(255).optional(),
  storage_conditions: Joi.string().max(255).optional(),
  brand_owner_id: Joi.string().max(255).required(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().required(),
});

export const createFoodProductSafety = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = foodProductSafetySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create food product safety entry
    const newFoodProductSafety = await prisma.tblDlFoodProductSafety.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update compliance status in tblWflCompliance
    await updateTblWflCompliance(value.barcode);

    res.status(201).json({
      message: "Food product safety created successfully.",
      foodProductSafety: newFoodProductSafety,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateFoodProductSafetySchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  batch_number: Joi.string().max(100).optional(),
  manufacture_date: Joi.date().optional(),
  expiry_date: Joi.date().optional(),
  supplier_id: Joi.number().integer().optional(),
  inspection_date: Joi.date().optional(),
  inspection_result: Joi.string().max(100).optional(),
  issue_detected: Joi.boolean().optional(),
  issue_description: Joi.string().optional(),
  corrective_action: Joi.string().optional(),
  status: Joi.string().max(100).optional(),
  recall_date: Joi.date().optional(),
  regulatory_compliance: Joi.string().max(255).optional(),
  storage_conditions: Joi.string().max(255).optional(),
  last_modified_by: Joi.string().max(255).required(),
  domainName: Joi.string().optional(),
});

export const updateFoodProductSafety = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateFoodProductSafetySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update food product safety entry
    const updatedFoodProductSafety = await prisma.tblDlFoodProductSafety.update(
      {
        where: { id },
        data: {
          ...value,
          updated_at: new Date(),
        },
      }
    );

    res.json({
      message: "Food product safety updated successfully.",
      foodProductSafety: updatedFoodProductSafety,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getFoodProductSafeties = async (req, res, next) => {
  try {
    // Define allowed columns for filtering
    const allowedColumns = {
      barcode: Joi.string(),
      batch_number: Joi.string(),
      status: Joi.string(),
      issue_detected: Joi.boolean(),
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

    let foodProductSafeties;
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

      // First, get the total count of food product safeties that match the filter conditions
      totalProducts = await prisma.tblDlFoodProductSafety.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      // Then, get the paginated results
      foodProductSafeties = await prisma.tblDlFoodProductSafety.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      // Parse images field if present
      const parsedFoodProductSafeties = foodProductSafeties.map((safety) => ({
        ...safety,
        images: safety.images ? JSON.parse(safety.images) : [],
      }));

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        totalPages: totalPages,
        foodProductSafeties: parsedFoodProductSafeties,
      });
    } else {
      // No pagination: return all matching food product safeties in one page
      foodProductSafeties = await prisma.tblDlFoodProductSafety.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = foodProductSafeties.length;

      // Parse images field if present
      const parsedFoodProductSafeties = foodProductSafeties.map((safety) => ({
        ...safety,
        images: safety.images ? JSON.parse(safety.images) : [],
      }));

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        foodProductSafeties: parsedFoodProductSafeties,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteFoodProductSafety = async (req, res, next) => {
  try {
    const { id } = req.params;

    // first check if the food product safety exists
    const foodProductSafety = await prisma.tblDlFoodProductSafety.findUnique({
      where: { id },
    });

    if (!foodProductSafety) {
      throw createError(404, "Food product safety not found for the given ID.");
    }

    // Delete food product safety entry
    await prisma.tblDlFoodProductSafety.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Food product safety deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// .... tblDlPackaging Controller .....

const packagingSchema = Joi.object({
  barcode: Joi.string().max(50).required(),
  packaging_type: Joi.string().max(100).required(),
  material: Joi.string().max(100).required(),
  dimensions: Joi.string().max(100).optional(),
  weight: Joi.number().precision(2).optional(),
  capacity: Joi.string().max(100).optional(),
  recyclable: Joi.boolean().optional(),
  biodegradable: Joi.boolean().optional(),
  packaging_supplier: Joi.string().max(255).optional(),
  cost_per_unit: Joi.number().precision(2).optional(),
  color: Joi.string().max(50).optional(),
  labeling: Joi.string().optional(),
  brand_owner_id: Joi.string().max(255).optional(),
  last_modified_by: Joi.string().max(255).required(),
  status: Joi.string().default("active"), // Set status to "active" by default
  domainName: Joi.string().required(),
});

export const createPackaging = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = packagingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle file uploads
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      imagePaths = files.map((file) => file.path.replace("public", ""));
    }

    // Create packaging entry
    const newPackaging = await prisma.tblDlPackaging.create({
      data: {
        ...value,
        images: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null,
      },
    });

    // Update the compliance status in tblWflCompliance
    await updateTblWflCompliance(value.barcode);
    res.status(201).json({
      message: "Packaging created successfully.",
      packaging: newPackaging,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updatePackagingSchema = Joi.object({
  barcode: Joi.string().max(50).optional(),
  packaging_type: Joi.string().max(100).optional(),
  material: Joi.string().max(100).optional(),
  dimensions: Joi.string().max(100).optional(),
  weight: Joi.number().precision(2).optional(),
  capacity: Joi.string().max(100).optional(),
  recyclable: Joi.boolean().optional(),
  biodegradable: Joi.boolean().optional(),
  packaging_supplier: Joi.string().max(255).optional(),
  cost_per_unit: Joi.number().precision(2).optional(),
  color: Joi.string().max(50).optional(),
  labeling: Joi.string().optional(),
  last_modified_by: Joi.string().max(255).required(),
  status: Joi.string().optional().default("active"), // Status remains "active" if not provided
  domainName: Joi.string().optional(),
});

export const updatePackaging = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updatePackagingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Update packaging entry
    const updatedPackaging = await prisma.tblDlPackaging.update({
      where: { id },
      data: {
        ...value,
        updated_at: new Date(),
      },
    });

    res.json({
      message: "Packaging updated successfully.",
      packaging: updatedPackaging,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getPackagings = async (req, res, next) => {
  try {
    // Define allowed columns for filtering
    const allowedColumns = {
      barcode: Joi.string(),
      packaging_type: Joi.string(),
      material: Joi.string(),
      recyclable: Joi.boolean(),
      biodegradable: Joi.boolean(),
      status: Joi.string(),
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

    let packagings;
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

      // First, get the total count of packagings that match the filter conditions
      totalProducts = await prisma.tblDlPackaging.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      // Then, get the paginated results
      packagings = await prisma.tblDlPackaging.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      // Parse images field if present
      const parsedPackagings = packagings.map((packaging) => ({
        ...packaging,
        images: packaging.images ? JSON.parse(packaging.images) : [],
      }));

      return res.json({
        currentPage: page,
        pageSize: pageSize,
        totalProducts: totalProducts,
        totalPages: totalPages,
        packagings: parsedPackagings,
      });
    } else {
      // No pagination: return all matching packagings in one page
      packagings = await prisma.tblDlPackaging.findMany({
        where: filterConditions,
        orderBy: { updated_at: "desc" },
      });
      totalProducts = packagings.length;

      // Parse images field if present
      const parsedPackagings = packagings.map((packaging) => ({
        ...packaging,
        images: packaging.images ? JSON.parse(packaging.images) : [],
      }));

      return res.json({
        currentPage: 1,
        pageSize: totalProducts, // The size of the entire result set
        totalProducts: totalProducts,
        totalPages: 1,
        packagings: parsedPackagings,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deletePackaging = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete packaging entry
    await prisma.tblDlPackaging.delete({
      where: { id },
    });

    res.status(200).json({ message: "Packaging deleted successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
