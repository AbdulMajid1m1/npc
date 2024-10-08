import prisma from "../prismaClient.js";
import Joi from "joi";
import { createError } from "../utils/createError.js";
import fs from "fs/promises";
import path from "path";
const mega_menus = Joi.object({
  name_en: Joi.string().max(255).required(),
  name_ar: Joi.string().max(255).required(),
  status: Joi.number().required(),
});

export const getAllmega_menu = async (req, res, next) => {
  try {
    const AllUNSPSC = await prisma.mega_menus.findMany({
      orderBy: {
        updated_at: "desc", // Order by updated_at in descending order
      },
    });

    res.json(AllUNSPSC);
  } catch (error) {
    next(error);
  }
};
export const createmega_menus = async (req, res, next) => {
  try {
    const { error, value } = mega_menus.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const unit = await prisma.mega_menus.create({
      data: value,
    });
    res.status(201).json(unit);
  } catch (error) {
    next(error);
  }
};
export const getmega_menusById = async (req, res, next) => {
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

    const cr = await prisma.mega_menus.findUnique({
      where: { id: id },
    });
    if (!cr) {
      return next(createError(404, "mega_menus not found"));
    }
    return res.json(cr);
  } catch (error) {
    next(error);
  }
};
export const updatemega_menus = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error: idError } = schema.validate(req.params);
    if (idError) {
      return next(createError(400, idError.details[0].message));
    }

    const { id } = req.params;

    const { error } = mega_menus.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name_en, name_ar, status } = req.body;
    const updatedUNSPSC = await prisma.mega_menus.update({
      where: { id: id },
      data: {
        name_en,
        name_ar,
        status,
      },
    });

    res.json(updatedUNSPSC);
  } catch (error) {
    next(error);
  }
};
export const deletemega_menus = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return next(createError(400, error.details[0].message));
    }
    const { id } = req.params;
    await prisma.mega_menus.delete({
      where: { id: id },
    });
    return res.json({ message: "mega menus deleted successfully" });
  } catch (error) {
    next(error);
  }
};
const mega_menu_categories = Joi.object({
  parent_id: Joi.string().max(255).required(),
  megamenu_id: Joi.string().max(255).required(),
  category_name_en: Joi.string().max(255).required(),
  category_name_ar: Joi.string().max(255).required(),
  description: Joi.string().max(255),
  url: Joi.string().max(255).required(),
  caption: Joi.string().max(255).required(),
  caption_ar: Joi.string().max(255).required(),
  meta_title: Joi.string().max(255),
  meta_description: Joi.string().max(255),
  meta_keywords: Joi.string().max(255),
  status: Joi.number().required(),
});
export const getAllmega_menu_categories = async (req, res, next) => {
  try {
    const AllUNSPSC = await prisma.mega_menu_categories.findMany({
      orderBy: {
        updated_at: "desc", // Order by updated_at in descending order
      },
    });

    res.json(AllUNSPSC);
  } catch (error) {
    next(error);
  }
};
export const creatmega_menu_categories = async (req, res, next) => {
    try {
        const { error, value } = mega_menu_categories.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        const uploadedImage = req.files.image; // Use req.file for a single file
        if (!uploadedImage) {
          return res.status(400).json({ error: "Image is required" });
        }
    
        const documentFile = uploadedImage[0];
        const documentPath = path.join(
          documentFile.destination,
          documentFile.filename
        );
        const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, "");
        const sliderData = {
          image: imagePathWithoutPublic,
          ...value,
        };
        const newCategory = await prisma.mega_menu_categories.create({
          data: sliderData,
        });
    
        res.status(201).json(newCategory);
      } catch (error) {
    next(error);
  }
};
export const getmega_menu_categoriesById = async (req, res, next) => {
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

    const cr = await prisma.mega_menu_categories.findUnique({
      where: { id: id },
    });
    if (!cr) {
      return next(createError(404, "mega menu categories not found"));
    }
    return res.json(cr);
  } catch (error) {
    next(error);
  }
};
export const updatemega_menu_categories = async (req, res, next) => {
    try {
        // Validate request parameters
        const paramSchema = Joi.object({
          id: Joi.string().required(),
        });
        const { error: idError } = paramSchema.validate(req.params);
        if (idError) {
          return next(createError(400, idError.details[0].message));
        }
    
        const { id } = req.params;
    
        // Define and validate request body
        const bodySchema = Joi.object({
            parent_id: Joi.string().max(255).required(),
            megamenu_id: Joi.string().max(255).required(),
            category_name_en: Joi.string().max(255).required(),
            category_name_ar: Joi.string().max(255).required(),
            description: Joi.string().max(255),
            url: Joi.string().max(255).required(),
            caption: Joi.string().max(255).required(),
            caption_ar: Joi.string().max(255).required(),
            meta_title: Joi.string().max(255),
            meta_description: Joi.string().max(255),
            meta_keywords: Joi.string().max(255),
            status: Joi.number().required(),
        });
    
        const { error, value } = bodySchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        const existingCategory = await prisma.mega_menu_categories.findUnique({
          where: { id: id },
        });
    
        if (!existingCategory) {
          return next(createError(404, 'mega_menu_categories not found'));
        }
    
        let imagePath = existingCategory.image || '';
    
        // Handle image upload
        if (req.files && req.files.image) {
          const imageFile = req.files.image[0];
          const imagePathWithPublic = path.join(imageFile.destination, imageFile.filename);
    
          // Delete the existing image if there is one
          if (existingCategory.image) {
            const existingImagePath = path.join(existingCategory.image);
            try {
              await fs.unlink(existingImagePath);
            } catch (unlinkError) {
              console.error('Error deleting existing image:', unlinkError);
            }
          }
    
          imagePath = imagePathWithPublic.replace(/^public[\\/]/, '');
        }
    
        const updatedCategory = await prisma.mega_menu_categories.update({
          where: { id: id },
          data: {
            ...value,
            image: imagePath,
          },
        });
    
        res.json(updatedCategory);
      } catch (error) {
    next(error);
  }
};
export const deletemega_menu_categories = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return next(createError(400, error.details[0].message));
    }
    const { id } = req.params;
    await prisma.mega_menu_categories.delete({
      where: { id: id },
    });
    return res.json({ message: "mega menu categories deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const mega_menu_categories_frontSide = async (req, res, next) => {
  try {
    const mega_menus_with_categories = await prisma.mega_menus.findMany({
      where: {
        status: 1,
      },
      include: {
        mega_menu_categories: {
          where: {
            status: 1,
          },
          include: {
            footer_menus: {
              where: {
                status: 1,
              },
            },
          },
        },
      },
    });

    res.json(mega_menus_with_categories);
  } catch (error) {
    console.error("Error fetching mega menu categories:", error);
    next(error);
  }
};

const footer_menus = Joi.object({
  parent_id: Joi.string().max(255).required(),
  category_name_en: Joi.string().max(255).required(),
  category_name_ar: Joi.string().max(255).required(),
  url: Joi.string().max(255).required(),
  status: Joi.number().required(),
});
export const getAllfooter_menus = async (req, res, next) => {
  try {
    const AllUNSPSC = await prisma.footer_menus.findMany({
      orderBy: {
        updated_at: "desc", // Order by updated_at in descending order
      },
    });

    res.json(AllUNSPSC);
  } catch (error) {
    next(error);
  }
};
export const creatfooter_menus = async (req, res, next) => {
  try {
    const { error, value } = footer_menus.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const unit = await prisma.footer_menus.create({
      data: value,
    });
    res.status(201).json(unit);
  } catch (error) {
    next(error);
  }
};
export const getfooter_menusById = async (req, res, next) => {
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

    const cr = await prisma.footer_menus.findUnique({
      where: { id: id },
    });
    if (!cr) {
      return next(createError(404, "footer menus not found"));
    }
    return res.json(cr);
  } catch (error) {
    next(error);
  }
};
export const updatefooter_menus = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error: idError } = schema.validate(req.params);
    if (idError) {
      return next(createError(400, idError.details[0].message));
    }

    const { id } = req.params;

    const { error } = footer_menus.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { parent_id, category_name_en, category_name_ar, url, status } =
      req.body;
    const updatedUNSPSC = await prisma.footer_menus.update({
      where: { id: id },
      data: {
        parent_id,
        category_name_en,
        category_name_ar,
        url,
        status,
      },
    });

    res.json(updatedUNSPSC);
  } catch (error) {
    next(error);
  }
};
export const deletefooter_menus = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return next(createError(400, error.details[0].message));
    }
    const { id } = req.params;
    await prisma.footer_menus.delete({
      where: { id: id },
    });
    return res.json({ message: "footer menus deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllfeatured_services = async (req, res, next) => {
    try {
      const AllUNSPSC = await prisma.featured_services.findMany({
        orderBy: {
          updated_at: "desc", // Order by updated_at in descending order
        },
      });
  
      res.json(AllUNSPSC);
    } catch (error) {
      next(error);
    }
  };
  export const creatfeatured_services = async (req, res, next) => {
    const featured_services = Joi.object({
      name_en: Joi.string().max(255).required(),
      name_ar: Joi.string().max(255).required(),
      link: Joi.string().max(255).required(),
      status: Joi.number().required(),
      description: Joi.string().required(),
      description_ar: Joi.string().required(),
    });
  
    const { error, value } = featured_services.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    try {
      const uploadedDocument = req.files.image;
      if (!uploadedDocument) {
        return res
          .status(400)
          .json({ error: "featured services image is required" });
      }
  
      const documentFile = uploadedDocument[0];
      const documentPath = path.join(
        documentFile.destination,
        documentFile.filename
      );
      const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, "");
      const sliderData = {
        image: imagePathWithoutPublic,
        ...value,
      };
  
      const newSlider = await prisma.featured_services.create({
        data: sliderData,
      });
  
      res.status(201).json(newSlider);
    } catch (error) {
      next(error);
    }
  };
  export const getfeatured_servicesById = async (req, res, next) => {
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
  
      const cr = await prisma.featured_services.findUnique({
        where: { id: id },
      });
      if (!cr) {
        return next(createError(404, "featured services not found"));
      }
      return res.json(cr);
    } catch (error) {
      next(error);
    }
  };
  export const updatefeatured_services = async (req, res, next) => {
    try {
      const featured_services = Joi.object({
        name_en: Joi.string().max(255).required(),
        name_ar: Joi.string().max(255).required(),
        link: Joi.string().max(255).required(),
        status: Joi.number().required(),
        description: Joi.string().required(),
        description_ar: Joi.string().required(),
      });
      const { id } = req.params;
      const existingBankSlip = await prisma.featured_services.findUnique({
        where: { id: id },
      });
  
      if (!existingBankSlip) {
        return next(createError(404, "image not found"));
      }
  
      let imagePathWithoutPublic = existingBankSlip.image || "";
  
      if (req.files && req.files.image) {
        const documentFile = req.files.image[0];
        const documentPath = path.join(
          documentFile.destination,
          documentFile.filename
        );
  
        if (existingBankSlip.image) {
          const existingDocumentPath = path.join(existingBankSlip.image);
          try {
            await fs.unlink(existingDocumentPath);
          } catch (unlinkError) {
            console.error("Error deleting existing image:", unlinkError);
          }
        }
  
        imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, "");
      }
  
      const { error, value } = featured_services.validate(req.body);
  
      const sliderData = {
        image: imagePathWithoutPublic,
        ...value,
      };
  
      const updatedBankSlip = await prisma.featured_services.update({
        where: { id: id },
        data: sliderData,
      });
  
      res.json(updatedBankSlip);
    } catch (error) {
      next(error);
    }
  };
  export const deletefeatured_services = async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error } = schema.validate(req.params);
      if (error) {
        return next(createError(400, error.details[0].message));
      }
      const { id } = req.params;
      await prisma.featured_services.delete({
        where: { id: id },
      });
      return res.json({ message: "featured services deleted successfully" });
    } catch (error) {
      next(error);
    }
  };


  export const getAllupcoming_events = async (req, res, next) => {
    try {
      const AllUNSPSC = await prisma.upcoming_events.findMany({
        orderBy: {
          updated_at: "desc", // Order by updated_at in descending order
        },
      });
  
      res.json(AllUNSPSC);
    } catch (error) {
      next(error);
    }
  };
  export const creatupcoming_events = async (req, res, next) => {
    const upcoming_events = Joi.object({
      title: Joi.string().max(255).required(),
      title_ar: Joi.string().max(255).required(),
      date: Joi.string().max(255).required(),
      link: Joi.string().max(255).required(),
      status: Joi.number().required(),
      display_type: Joi.string().max(255).required(),
      description: Joi.string().max(255).required(),
      description_ar: Joi.string().max(255).required(),
    });
    const { error, value } = upcoming_events.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    try {
      const uploadedDocument = req.files.image;
      if (!uploadedDocument) {
        return res
          .status(400)
          .json({ error: "upcoming events image is required" });
      }
  
      const documentFile = uploadedDocument[0];
      const documentPath = path.join(
        documentFile.destination,
        documentFile.filename
      );
      const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, "");
      const sliderData = {
        image: imagePathWithoutPublic,
        ...value,
      };
  
      const newSlider = await prisma.upcoming_events.create({
        data: sliderData,
      });
  
      res.status(201).json(newSlider);
    } catch (error) {
      next(error);
    }
  };
  export const getupcoming_eventsById = async (req, res, next) => {
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
  
      const cr = await prisma.upcoming_events.findUnique({
        where: { id: id },
      });
      if (!cr) {
        return next(createError(404, "upcoming events services not found"));
      }
      return res.json(cr);
    } catch (error) {
      next(error);
    }
  };
  export const updateupcoming_events = async (req, res, next) => {
    try {
      const upcoming_events = Joi.object({
        title: Joi.string().max(255).required(),
        title_ar: Joi.string().max(255).required(),
        date: Joi.string().max(255).required(),
        link: Joi.string().max(255).required(),
        status: Joi.number().required(),
        display_type: Joi.string().max(255).required(),
        video: Joi.string().max(255).required(),
        description: Joi.string().max(255).required(),
        description_ar: Joi.string().max(255).required(),
      });
      const { id } = req.params;
      const existingBankSlip = await prisma.upcoming_events.findUnique({
        where: { id: id },
      });
  
      if (!existingBankSlip) {
        return next(createError(404, "image not found"));
      }
  
      let imagePathWithoutPublic = existingBankSlip.image || "";
  
      if (req.files && req.files.image) {
        const documentFile = req.files.image[0];
        const documentPath = path.join(
          documentFile.destination,
          documentFile.filename
        );
  
        if (existingBankSlip.image) {
          const existingDocumentPath = path.join(existingBankSlip.image);
          try {
            await fs.unlink(existingDocumentPath);
          } catch (unlinkError) {
            console.error("Error deleting existing image:", unlinkError);
          }
        }
  
        imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, "");
      }
  
      const { error, value } = upcoming_events.validate(req.body);
  
      const sliderData = {
        image: imagePathWithoutPublic,
        ...value,
      };
  
      const updatedBankSlip = await prisma.upcoming_events.update({
        where: { id: id },
        data: sliderData,
      });
  
      res.json(updatedBankSlip);
    } catch (error) {
      next(error);
    }
  };
  export const deleteupcoming_events = async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error } = schema.validate(req.params);
      if (error) {
        return next(createError(400, error.details[0].message));
      }
      const { id } = req.params;
      await prisma.upcoming_events.delete({
        where: { id: id },
      });
      return res.json({ message: "upcoming events deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  