import prisma from "../prismaClient.js";
import Joi from "joi";
import { gs1Prisma } from "../prismaMultiClinets.js";
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
    country_id: Joi.number().required(),
});
const citiesSchema = Joi.object({
    name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255),
    state_id: Joi.number().required(),
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
