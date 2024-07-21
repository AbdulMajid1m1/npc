import prisma from "../prismaClient.js";
import Joi from "joi";
import { gs1Prisma } from "../prismaMultiClinets.js";
import { sendEmail, sendMultipleEmails } from "../services/emailTemplates.js";
import bcrypt from "bcryptjs";
import { createError } from '../utils/createError.js';
const unitSchema = Joi.object({
    unit_code: Joi.string().max(255).required(),
    unit_name: Joi.string().max(255).required(),
    status: Joi.number().valid(0,1).required(),
    
});

export const createunit = async (req, res, next) => {
    try {
        const { error, value } = unitSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.units.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};

export const getAllunit = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.units.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });

        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};

export const getunitById = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.units.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'CR not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};

export const updateunit = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = unitSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { unit_code, unit_name, status } = req.body;
        const updatedUNSPSC = await prisma.units.update({
            where: { id: id },
            data: {
                unit_code,
                unit_name,
                status
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};

export const deleteunit = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.units.delete({
            where: { id: id },
        });
        return res.json({ message: 'Unite deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const documentSchema = Joi.object({
    name: Joi.string().max(255).required(),
    status: Joi.number().valid(0, 1).required(),

});
const document_typesSchema = Joi.object({
    file_name: Joi.string().max(255).required(),
    status: Joi.number().valid(0, 1).required(),

});
export const createdocument = async (req, res, next) => {
    try {
        const { error, value } = documentSchema.validate(req.body);
        if (error) {


            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.cr_documents.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllcr_documents = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.cr_documents.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getcr_documentsById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.cr_documents.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'documents not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatecr_documents = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = documentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = req.body;
        const updatedUNSPSC = await prisma.cr_documents.update({
            where: { id: id },
            data: {
                name,
                status

            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletecr_documents = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.cr_documents.delete({
            where: { id: id },
        });
        return res.json({ message: 'cr_documents deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//----------------DOCUMENTTYPE-----------------------------------
export const createdocumentType = async (req, res, next) => {
    try {
        const { error, value } = document_typesSchema.validate(req.body);
        if (error) {


            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.document_type.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAlldocumentType = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.document_type.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getAlldocumentTypename = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.document_type.findMany({
            select: {
                file_name: true
            }
        });;


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getdocumentTypeById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.document_type.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'documentType not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatedocumentType = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = document_typesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { file_name, status } = req.body;
        const updatedUNSPSC = await prisma.document_type.update({
            where: { id: id },
            data: {
                file_name,
                status

            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletedocumentType = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.document_type.delete({
            where: { id: id },
        });
        return res.json({ message: 'documents deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//------------------OTHER PRODUCTs--------------------------------
const otherProductSchema = Joi.object({
    product_name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255),
    total_no_of_barcodes: Joi.number(),
    product_subscription_fee: Joi.number(),
    code: Joi.string().max(255),
    status: Joi.number().valid(0,1).required(),
    med_subscription_fee: Joi.number(),
    variant: Joi.string().max(255),
    
});

export const createotherproduct = async (req, res, next) => {
    try {
        const { error, value } = otherProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.other_products.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllotherproduct = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.other_products.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getotherproductById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.other_products.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'products not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateotherproduct = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = otherProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {
            product_name,
            total_no_of_barcodes,
            product_subscription_fee,
            code,
            status,
            med_subscription_fee,
            variant,
            name_ar
        } = req.body;
        const updatedUNSPSC = await prisma.other_products.update({
            where: {id: id },
            data: {
                product_name,
                total_no_of_barcodes,
                code,
                status,
                med_subscription_fee,
                variant,
                product_subscription_fee,
                name_ar
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteotherproduct = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.other_products.delete({
            where: { id: id },
        });
        return res.json({ message: 'Other_product deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//-----------------------------GCP API----------------------------------------------------

const gpc_typeSchema = Joi.object({
    gcp_code: Joi.string().max(255).required(),
    gcp_description: Joi.string().max(255),
    
});

export const creategpctype = async (req, res, next) => {
    try {
        const { error, value } = gpc_typeSchema.validate(req.body);
        if (error) {
            

            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.gcp_types.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllgpctype = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.gcp_types.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getgpctypeById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.gcp_types.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'products not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updategpctype = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = gpc_typeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { gcp_code, gcp_description } = req.body;
        const updatedUNSPSC = await prisma.gcp_types.update({
            where: {id: id },
            data: {
                gcp_code,
                gcp_description,
                
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletegpctype = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.gcp_types.delete({
            where: { id: id },
        });
        return res.json({ message: 'gpctype deleted successfully' });
    } catch (error) {
        next(error);
    }
};

//-----------------------productPacakging--------------------------------
const productPackagSchema = Joi.object({
    name: Joi.string().max(255).required(),
    status: Joi.number().valid(0, 1).required(),

});

export const createProductPackag = async (req, res, next) => {
    try {
        const { error, value } = productPackagSchema.validate(req.body);
        if (error) {


            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.product_packagings.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};

export const getAllproductPackagSchema = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.product_packagings.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getproductPackagSchemaById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.product_packagings.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'CR not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateproductPackagSchema = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = productPackagSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = req.body;
        const updatedUNSPSC = await prisma.product_packagings.update({
            where: { id: id },
            data: {
                name,
                status

            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteproductPackagSchema = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.product_packagings.delete({
            where: { id: id },
        });
        return res.json({ message: 'productPackag deleted successfully' });
    } catch (error) {
        next(error);
    }
};

//----------------------------emailSettings----------------------------------------------------
const emailsettingSchema = Joi.object({
    emailfrom: Joi.string().max(255).required(),
    smtp_host: Joi.string().max(255),
    emailmethod: Joi.string().required(),
    smtp_username: Joi.string().required(),
    smtp_password: Joi.string().max(255).required(),
  
    smtp_port: Joi.string().required(),
    smtp_encryption: Joi.string().required(),
  
    status: Joi.number().valid(0, 1).required(),
  });
  export const createemailsetting = async (req, res, next) => {
    try {
      const { error, value } = emailsettingSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const unit = await prisma.emailsetting.create({
        data: value,
      });
      res.status(201).json(unit);
    } catch (error) {
      next(error);
    }
  };
  export const getAllemailsetting = async (req, res, next) => {
    try {
      const AllUNSPSC = await prisma.emailsetting.findMany({
        orderBy: {
          updated_at: "desc", // Order by updated_at in descending order
        },
      });
  
      res.json(AllUNSPSC);
    } catch (error) {
      next(error);
    }
  };
  export const getemailsettingById = async (req, res, next) => {
    try {
      // const { id } = req.params;
      // use JOi to validate the id
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error } = schema.validate(req.params);
      if (error) {
        return next(createError(400, error.details[0].message));
      }
  
      const { id } = req.params;
  
      const cr = await prisma.emailsetting.findUnique({
        where: {
          id: id,
        },
      });
      if (!cr) {
        return next(createError(404, "Email Setting not found"));
      }
      return res.json(cr);
    } catch (error) {
      next(error);
    }
  };
  export const updateemailsetting = async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error: idError } = schema.validate(req.params);
      if (idError) {
        return next(createError(400, idError.details[0].message));
      }
  
      const { id } = req.params;
  
      const { error } = emailsettingSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
  
      const {
        emailfrom,
        smtp_host,
        emailmethod,
        smtp_username,
        status,
        smtp_password,
        smtp_port,
        smtp_encryption,
      } = req.body;
      const updatedUNSPSC = await prisma.emailsetting.update({
        where: {
          id: id,
        },
        data: {
          emailfrom,
          smtp_host,
          emailmethod,
          smtp_username,
          status,
          smtp_password,
          smtp_port,
          smtp_encryption,
        },
      });
  
      res.json(updatedUNSPSC);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteemailsetting = async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error } = schema.validate(req.params);
      if (error) {
        return next(createError(400, error.details[0].message));
      }
      const { id } = req.params;
      await prisma.emailsetting.delete({
        where: {
          id: id,
        },
      });
      return res.json({
        message: "Email Setting deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //----------------------------country-of-sale --------------------
  const countryofsaleSchema = Joi.object({
    Alpha2: Joi.string().max(255).required(),
    Alpha3: Joi.string().max(255).required(),
    country_code_numeric3: Joi.string().max(255).required(),
    country_name: Joi.string().max(255).required(),
    
});

export const createcountryofsale = async (req, res, next) => {
    try {
        const { error, value } = countryofsaleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.country_of_sales.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllcountryofsale = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.country_of_sales.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getcountryof_saleById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.country_of_sales.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'products not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatecountryofsale = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = countryofsaleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { Alpha2, Alpha3,country_code_numeric3,country_name } = req.body;
        const updatedUNSPSC = await prisma.country_of_sales.update({
            where: {id: id },
            data: {
                Alpha2,
                Alpha3,
                country_code_numeric3,
                country_name
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletecountryofsale = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.country_of_sales.delete({
            where: { id: id },
        });
        return res.json({ message: 'country of sale deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//----------------------------HSCODE----------------------------
const HsCodeSchema = Joi.object({
    CNKEY: Joi.string().max(255).required(),
    HSCODES: Joi.string().max(255).required(),
    DescriptionEN: Joi.string().max(255).required(),
    addBy: Joi.number().required(),
    
});

export const createHsCode = async (req, res, next) => {
    try {
        const { error, value } = HsCodeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.hs_codes.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};

export const getAllHsCode = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.hs_codes.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getHsCodeById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.hs_codes.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'products not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateHsCode = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = HsCodeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { CNKEY, HSCODES,DescriptionEN,addBy } = req.body;
        const updatedUNSPSC = await prisma.hs_codes.update({
            where: {id: id },
            data: {
                CNKEY,
                HSCODES,
                DescriptionEN,
                addBy
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteHsCode = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.hs_codes.delete({
            where: { id: id },
        });
        return res.json({ message: 'HsCode deleted successfully' });
    } catch (error) {
        next(error);
    }
};

//---------------------------UNSPSCS-----------------------------------
const UNSPSCSchema = Joi.object({
    commodity: Joi.number().required(),
    title: Joi.string().max(255).required(),
    definition: Joi.string().max(255).required(),
    addedBy: Joi.number().required(),
    
});
export const createUNSPSC = async (req, res, next) => {
    try {
        const { error, value } = UNSPSCSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.unspscs.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllUNSPSC = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.unspscs.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getUNSPSCById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.unspscs.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'CR not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateUNSPSC = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = UNSPSCSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { commodity, title, definition,addedBy } = req.body;
        const updatedUNSPSC = await prisma.unspscs.update({
            where: {id: id },
            data: {
                commodity,
                title,
                definition,
                addedBy
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteUNSPSC = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.unspscs.delete({
            where: { id: id },
        });
        return res.json({ message: 'UNSPSC deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const countrySchema = Joi.object({
    name_en: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255),
    country_code: Joi.string().max(255).required(),
    country_shortName: Joi.string().max(255),
    status: Joi.number().integer().min(0).max(1),
});
const stateSchema = Joi.object({
    name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255),
    country_id: Joi.string().required(),
});
const citiesSchema = Joi.object({
    name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255),
    state_id: Joi.string().required(),
});
//--------------------Country---------------------------------------
export const getAllCountries = async (req, res, next) => {
    try {
        const countries = await prisma.countries.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });

        res.json(countries);
    } catch (error) {
        next(error);
    }
};
export const getAllCountriesName = async (req, res, next) => {
    try {
        const countries = await prisma.countries.findMany({
            select: {
                name_en: true,
                name_ar: true,
                id: true,
            },
        });

        res.json(countries);
    } catch (error) {
        next(error);
    }
};
export const createCountries = async (req, res, next) => {
    try {
        const { error, value } = countrySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.countries.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getCountriesById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.countries.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'countries not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateCountries = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = countrySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name_en, name_ar,country_code,country_shortName,status } = req.body;
        const updatedUNSPSC = await prisma.countries.update({
            where: {id: id },
            data: {
                name_en,
                name_ar,
                country_code,
                country_shortName,
                status
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteCountries = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.countries.delete({
            where: { id: id },
        });
        return res.json({ message: 'countries deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//--------------------STATE---------------------------------------
export const getAllStates = async (req, res, next) => {
    try {
        const states = await prisma.states.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });
        if (states.length === 0) {
            return next(createError(404, 'No states found'));
        }
        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const getAllStatesName = async (req, res, next) => {
    try {
        const states = await prisma.states.findMany({
            select: {
                name: true,
                name_ar:true,
                id: true,
            },
        });
        if (states.length === 0) {
            return next(createError(404, 'No states found'));
        }
        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const createStates = async (req, res, next) => {
    try {
        const { error, value } = stateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.states.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getStatesById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.states.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'states not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateStates = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = stateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, country_id,name_ar } = req.body;
        const updatedUNSPSC = await prisma.states.update({
            where: {id: id },
            data: {
                name,
                country_id,
                name_ar
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteStates = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.states.delete({
            where: { id: id },
        });
        return res.json({ message: 'States deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//---------------------CITIES-----------------------------------------
export const getAllCities = async (req, res, next) => {
    try {
        const cities = await prisma.cities.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });
        if (cities.length === 0) {
            return next(createError(404, 'No Cities found'));
        }
        res.json(cities);
    } catch (error) {
        next(error);
    }
};
export const createCities = async (req, res, next) => {
    try {
        const { error, value } = citiesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.cities.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getCitiesById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.cities.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'cities not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateCities = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = citiesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, state_id,name_ar } = req.body;
        const updatedUNSPSC = await prisma.cities.update({
            where: {id: id },
            data: {
                name,
                state_id,
                name_ar,
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteCities = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.cities.delete({
            where: { id: id },
        });
        return res.json({ message: 'cities deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//--------------------------------------------------------------------
export const getStateByCountryId = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const states = await prisma.states.findMany({
            where: {
                country_id: +id,
            },
        });

        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const getCityByStateId = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cities = await prisma.cities.findMany({
            where: {
                state_id: +id,
            },
        });

        res.json(cities);
    } catch (error) {
        next(error);
    }
}

const languageSchema = Joi.object({
    type: Joi.string(),         // No maximum length constraint
    key: Joi.string().required(), // No maximum length constraint, but required
    value: Joi.string().required(), // No maximum length constraint, but required

});
export const translations = async (req, res, next) =>
    {
        try {
            const AllUNSPSC = await prisma.languages.findMany();
    
            // Create an empty object to store the formatted data
            let formattedData = {};
    
            // Loop through the data and populate the formatted object
            AllUNSPSC.forEach(item =>
            {
                formattedData[item.key] = item.value;
            });
    
            res.json(formattedData);
        } catch (error) {
            next(error);
        }
    };
   
    export const translations_table = async (req, res, next) =>
    {
        try {
            const AllUNSPSC = await prisma.languages.findMany();
    
    
            res.json(AllUNSPSC);
        } catch (error) {
            next(error);
        }
    };
    
    export const translations_put = async (req, res, next) =>
    {
        try {
            const languageSchema = Joi.object({
                value: Joi.string().required(),
            });
    
            const schema = Joi.object({
                id: Joi.string().required(),
            });
    
            const {
                error: idError
            } = schema.validate(req.params);
            if (idError) {
                throw createError(400, idError.details[0].message);
            }
    
            const {
                id
            } = req.params;
    
            const {
                error: validationError
            } = languageSchema.validate(req.body);
            if (validationError) {
                throw createError(400, validationError.details[0].message);
            }
    
            const {
                value
            } = req.body;
            const updatedTranslation = await prisma.languages.update({
                where: {
                    id: id, // Assuming "key" is the correct field to identify the record
                },
                data: {
                    value: value,
                },
            });
    
            res.json(updatedTranslation);
        } catch (error) {
            next(error);
        }
    };
    export const translations_post = async (req, res, next) =>
        {
            try {
                const {
                    error,
                    value
                } = languageSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({
                        error: error.details[0].message
                    });
                }
                const unit = await prisma.languages.create({
                    data: value,
                });
                res.status(201).json(unit);
            } catch (error) {
                next(error);
            }
        };


        const adminSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            username: Joi.string().required(),
            mobile: Joi.string().required(),
            isSuperAdmin: Joi.boolean().optional().default(false),
            roleIds: Joi.array().items(Joi.string()).optional(), // New field for role IDs
            // Image field is not included in the schema as it will be handled separately
          });
          
          export const addAdmin = async (req, res, next) => {
            try {
              // Validate request body
              const { error, value } = adminSchema.validate(req.body);
              if (error) {
                throw createError(400, error.details[0].message);
              }
          
              const { email, password, username, mobile, isSuperAdmin, roleIds } = value;
          
              // Check if the admin user already exists
              const existingAdmin = await prisma.admins.findFirst({
                where: { email },
              });
              if (existingAdmin) {
                return next(createError(400, "Admin with this email already exists."));
              }
          
              // Hash the password
              const saltRounds = 10;
              const hashedPassword = await bcrypt.hash(password, saltRounds);
          
              // Process image if uploaded
              let imagePath = null;
              if (req.files.image) {
                imagePath = req.files.image[0].path.replace("public", "");
              }
          
              // Create the admin user
              const newAdmin = await prisma.admins.create({
                data: {
                  email,
                  password: hashedPassword,
                  username,
                  mobile,
                  is_super_admin: isSuperAdmin ? 1 : 0,
                  ...(imagePath && { image: imagePath }),
                },
              });
          
              // Assign roles to the new admin
              if (roleIds && roleIds.length > 0) {
                const adminRoles = roleIds.map((roleId) => ({
                  adminId: newAdmin.id,
                  roleId: roleId,
                }));
                await prisma.adminRole.createMany({ data: adminRoles });
              }
          
              res.status(201).json({ message: "Admin user created successfully." });
            } catch (error) {
              console.error(error);
              next(error);
            }
          };
          
          // Validation schema for updating admin
          const updateAdminSchema = Joi.object({
            email: Joi.string().email().optional(),
            username: Joi.string().optional(),
            mobile: Joi.string().optional(),
            isSuperAdmin: Joi.boolean().optional(),
            password: Joi.string().min(6).optional(),
            roleIds: Joi.array().items(Joi.string()).optional().default([]),
          });
          export const updateAdmin = async (req, res, next) => {
            try {
              const { adminId } = req.params;
              // const { email, username, mobile, isSuperAdmin, password, roleIds } = req.body;
          
              // Validate incoming data using the schema
              const { error, value } = updateAdminSchema.validate(req.body);
              if (error) {
                throw createError(400, error.details[0].message);
              }
          
              const { email, username, mobile, isSuperAdmin, password, roleIds } = value;
              // Check if the admin user exists
              console.log("roleIds", roleIds);
              const existingAdmin = await prisma.admins.findUnique({
                where: { id: adminId },
              });
          
              if (!existingAdmin) {
                throw createError(404, "Admin user not found.");
              }
          
              // Prepare the data to be updated
              let updateData = {};
              if (email) updateData.email = email;
              if (username) updateData.username = username;
              if (mobile) updateData.mobile = mobile;
              if (isSuperAdmin !== undefined)
                updateData.is_super_admin = isSuperAdmin ? 1 : 0;
          
              // Hash the new password if provided
              if (password) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                updateData.password = hashedPassword;
              }
              let imagePath = null;
              if (req.files.image) {
                const profile = req.files.image[0];
                const profileName = profile.filename;
                profile.destination = profile.destination.replace("public", "");
                imagePath = path.join(profile.destination, profileName);
                if (existingAdmin.image) {
                  fs.unlinkSync(path.join("public", existingAdmin.image));
                  const existingFilePath = path.join("public", existingAdmin.image);
                  if (fs.existsSync(existingFilePath)) {
                    fs.unlinkSync(existingFilePath);
                  }
                }
              }
          
              // if imagePath is not null, add it to the updateData object
              if (imagePath) {
                updateData.image = imagePath;
              }
              // Update the admin user in the database
              await prisma.admins.update({
                where: { id: adminId },
                data: updateData,
              });
          
              // Fetch the current roles of the admin
              const currentRoles = await prisma.adminRole.findMany({
                where: { adminId },
              });
          
              // Extract the IDs of the current roles
              const currentRoleIds = currentRoles.map((role) => role.roleId);
          
              // Calculate the roles to be added and removed
              const rolesToAdd = roleIds.filter(
                (roleId) => !currentRoleIds.includes(roleId)
              );
              const rolesToRemove = currentRoleIds.filter(
                (roleId) => !roleIds.includes(roleId)
              );
          
              // Remove roles that need to be removed
              await prisma.adminRole.deleteMany({
                where: {
                  adminId,
                  roleId: {
                    in: rolesToRemove,
                  },
                },
              });
          
              // Add roles that need to be added
              const rolesToAddData = rolesToAdd.map((roleId) => ({
                adminId,
                roleId,
              }));
          
              if (rolesToAddData.length > 0) {
                await prisma.adminRole.createMany({
                  data: rolesToAddData,
                });
              }
          
              res.json({ message: "Admin user updated successfully." });
            } catch (error) {
              console.error(error);
              next(error);
            }
          };
          export const getAllAdmins = async (req, res, next) => {
            try {
              const admins = await prisma.admins.findMany({
                orderBy: {
                  updated_at: "desc", // Order by updated_at in descending order
                },
              });
              res.status(200).json(admins);
            } catch (error) {
              console.log(error);
              next(error);
            }
          };
          export const deleteAdmin = async (req, res, next) => {
            try {
              const schema = Joi.object({
                adminId: Joi.string().required(),
              });
          
              const { error, value } = schema.validate(req.params);
          
              if (error) {
                throw createError(400, error.details[0].message);
              }
          
              const { adminId } = value;
          
              // Check if the admin user exists
              const adminUser = await prisma.admins.findFirst({
                where: { id: adminId },
              });
          
              if (!adminUser) {
                throw createError(404, "Admin user not found.");
              }
          
              // Update or remove user references before deleting the admin
              await prisma.users.updateMany({
                where: { assign_to: adminId },
                data: { assign_to: null }, // or assign to another admin
              });
          
              // Now safe to delete the admin user
              await prisma.admins.delete({
                where: { id: adminId },
              });
          
              res.status(200).json({ message: "Admin user deleted successfully." });
            } catch (error) {
              console.error(error);
              next(error);
            }
          };

//-----------------ROLES----------------
const createRoleSchema = Joi.object({
    name: Joi.string().max(255).required(),
    permissions: Joi.array().items(Joi.string().max(255)), // You can specify the validation for permission IDs here if needed.
});

export const createRole = async (req, res, next) => {
    try {
        const { error, value } = createRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, permissions } = value; // permissions is an array of permission IDs


        const createdRole = await prisma.role.create({
            data: { name },
        });

        // Assign permissions to the role if they are provided
        if (permissions && permissions.length) {
            const rolePermissionsData = permissions.map(permissionId => ({
                roleId: createdRole.id,
                permissionId,
            }));

            await prisma.rolePermission.createMany({
                data: rolePermissionsData,
            });
        }

        // Optionally, fetch the role with permissions for the response
        const roleWithPermissions = await prisma.role.findUnique({
            where: { id: createdRole.id },
            include: { permissions: true },
        });

        res.status(201).json(roleWithPermissions);
    } catch (error) {
        console.log(error);
        next(error);
    }
};          
export const getRoles = async (req, res, next) => {
    try {
        const roles = await prisma.role.findMany({
            // include: {
            //     permissions: {
            //         include: {
            //             permission: true // This includes the Permission details in each RolePermission entry
            //         }
            //     },
            //     // admins: true // Includes related admins if needed
            // }
        });

        if (!roles || roles.length === 0) {
            throw createError(404, 'Roles not found');
        }


        res.json(roles);
    } catch (error) {
        next(error);
    }
};
const updateRoleSchema = Joi.object({
    name: Joi.string().max(255).required(),
    permissions: Joi.array().items(Joi.string()).unique().min(1)
});

export const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, permissions } = req.body;

        // Validate the incoming data using Joi schema
        const { error } = updateRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await prisma.$transaction(async (prisma) => {
            // Use the upsert operation to efficiently update the role
            const updatedRole = await prisma.role.upsert({
                where: { id },
                update: { name },
                create: { id, name },
            });

            // Fetch the current permissions of the role
            const currentPermissions = await prisma.rolePermission.findMany({
                where: { roleId: id },
            });

            // Extract the IDs of the current permissions
            const currentPermissionIds = currentPermissions.map((permission) => permission.permissionId);

            // Calculate the permissions to be added and removed
            const permissionsToAdd = permissions.filter((permissionId) => !currentPermissionIds.includes(permissionId));
            const permissionsToRemove = currentPermissionIds.filter((permissionId) => !permissions.includes(permissionId));

            // Remove permissions that need to be removed
            await prisma.rolePermission.deleteMany({
                where: {
                    roleId: id,
                    permissionId: {
                        in: permissionsToRemove,
                    },
                },
            });

            // Add permissions that need to be added
            const permissionsToAddData = permissionsToAdd.map((permissionId) => ({
                roleId: id,
                permissionId,
            }));

            if (permissionsToAddData.length > 0) {
                await prisma.rolePermission.createMany({
                    data: permissionsToAddData,
                });
            }

            return updatedRole;
        }, { timeout: 20000 });

        res.json(result);
    } catch (error) {
        next(error);
    }
};
const roleIdSchema = Joi.string().required();
export const getRole = async (req, res, next) => {
    try {
        // Validate the role ID
        const { error } = roleIdSchema.validate(req.params.id);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id } = req.params;

        // Fetch the role with associated permissions
        const role = await prisma.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Optionally transform the role data structure
        const transformedRole = {
            ...role,
            permissions: role.permissions.map(rp => rp.permission) // Flatten permissions array
        };

        res.json(transformedRole);
    } catch (error) {
        next(error);
    }
};
const deleteRoleSchema = Joi.object({
    id: Joi.string().required(),
});

export const deleteRole = async (req, res, next) => {
    try {
        const { error, value } = deleteRoleSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id } = value;

        // find role first
        const role = await prisma.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw createError(404, 'Role not found');
        }


        // Delete role permissions first
        await prisma.rolePermission.deleteMany({
            where: { roleId: id },
        });

        // Then delete the role
        await prisma.role.delete({
            where: { id },
        });

        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//------------------NEWS------------------------------------------------
import puppeteer from "puppeteer";
import { ADMIN_EMAIL, SUPPORT_EMAIL } from "../configs/envConfig.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const allowedColumns = {
    id: Joi.string(),
    email: Joi.string(),
    createdAt: Joi.date(),
  };
  
  export const getNewsletterSubscriptions = async (req, res) => {
    try {
      // Create a dynamic schema for the allowed columns
      const columnsSchema = Joi.object({
        columns: Joi.array().items(
          Joi.string().valid(...Object.keys(allowedColumns))
        ),
        filter: Joi.object().pattern(Joi.string(), Joi.any()),
      }).unknown(true); // Allow other keys not defined in the schema
  
      // Validate the request query
      const { error, value } = columnsSchema.validate(req.query);
      if (error) {
        return res.status(400).send({
          message: `Invalid query parameter: ${error.details[0].message}`,
        });
      }
  
      // Extract columns and filter parameters
      const selectedColumns =
        value.columns && value.columns.length > 0
          ? value.columns
          : Object.keys(allowedColumns);
  
      const filterConditions = value.filter || {};
  
      // Construct the Prisma select object
      const select = selectedColumns.reduce((obj, col) => {
        obj[col] = true;
        return obj;
      }, {});
  
      const subscriptions = await prisma.newsletterSubscription.findMany({
        where: filterConditions,
        select,
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return res.json(subscriptions);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  };
  const capturePage = async (url) => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
  
    // Set viewport to a wider screen to avoid hamburger menu
    await page.setViewport({ width: 1920, height: 1080 });
  
    await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 }); // Increased timeout to 90 seconds
  
    // Wait for 5 seconds to ensure the page is fully loaded
    await page.waitForTimeout(5000);
  
    // Capture screenshot
    const screenshot = await page.screenshot({
      encoding: "base64",
      fullPage: true,
    });
    await browser.close();
    return screenshot;
  };
  
  // Function to save the image
  const saveImage = async (base64Data, imageName) => {
    const imagePath = path.join(
      __dirname,
      "../public/uploads/images/newsletterImages",
      imageName
    );
    const imageBuffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(imagePath, imageBuffer);
    return imagePath;
  };
  
  export const sendNewsletter = async (req, res, next) => {
    // Define validation schema
    const schema = Joi.object({
      slug: Joi.string().required(), // Changed to slug
      subject: Joi.string().required(),
      emailBody: Joi.string().required(),
    });
  
    // Validate request body
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
  
    const { slug, subject, emailBody } = value;
  
    try {
      // Construct the full URL
      const frontendUrl = `${req.protocol}://${req.get("host")}`;
      const url = `${frontendUrl}/${slug}`;
  
      // Capture page screenshot
      const screenshot = await capturePage(url);
  
      // Generate unique image name
      const imageName = `newsletter-${Date.now()}.png`;
  
      // Save image to public/uploads/images/newsletterImages
      await saveImage(screenshot, imageName);
  
      // Get the backend URL dynamically
      const backendUrl = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${backendUrl}/uploads/images/newsletterImages/${imageName}`;
  
      // Fetch all subscribers
      const subscribers = await prisma.newsletterSubscription.findMany();
  
      // Prepare email data
      const emailData = subscribers.map((subscriber) => ({
        toEmail: subscriber.email,
        subject: subject,
        htmlContent: `
          <div>
            <p>${emailBody}</p>
            <p>Click the image to view the content:</p>
            <a href="${url}">
              <img src="${imageUrl}" alt="Newsletter Content" />
            </a>
          </div>
        `,
        attachments: [],
      }));
  
      // Send emails
      await sendMultipleEmails({ emailData, fromEmail: ADMIN_EMAIL });
  
      res.status(200).json({
        success: true,
        message: "Emails sent successfully!",
        imageUrl: imageUrl, // Include the image URL in the response
      });
    } catch (error) {
      console.error("Error sending emails:", error);
      next(error);
    }
  };
  