import axios from "axios";
import prisma from "../../prismaClient.js";
import { imageLiveUrl } from "../utils.js";
import https from "https";
import {
  GLOBAL_API_BASE_URL_PROD,
  GLOBAL_GEPIR_PROD_API_KEY,
} from "../../configs/envConfig.js";

export async function checkMultipleGtinData(barcodeList) {
  // Split the barcode list into smaller chunks
  const chunkSize = 1000; // Adjust as needed
  const barcodeChunks = [];
  for (let i = 0; i < barcodeList.length; i += chunkSize) {
    barcodeChunks.push(barcodeList.slice(i, i + chunkSize));
  }

  // Retrieve products in smaller batches
  const products = [];
  for (const chunk of barcodeChunks) {
    const chunkProducts = await prisma.products.findMany({
      where: {
        barcode: { in: chunk },
        deleted_at: null,
      },
      select: {
        barcode: true,
        id: true,
        // Add other selected fields as needed
      },
    });
    products.push(...chunkProducts);
  }

  // Process products and return ready product ids
  const readyProductIds = new Set();
  for (const product of products) {
    let isProductReady = true;
    for (const [key, value] of Object.entries(product)) {
      if (!value || value === "") {
        isProductReady = false;
        break; // No need to check further fields for this product
      }
    }
    if (isProductReady && product.id) {
      readyProductIds.add(product.id);
    }
  }

  return Array.from(readyProductIds);
}

export async function checkGtinData(barcode) {
  console.log("entered in checkGtin Data", barcode);
  const columns = [
    "front_image",
    "back_image",
    "BrandName",
    "BrandNameAr",
    "size",
    "Origin",
    "countrySale",
    "ProductType",
    "gpc_code",
    "details_page",
    "details_page_ar",
  ];

  // This flag tracks if all required fields are non-null and non-empty.
  let allFieldsComplete = true;

  // Sequentially check each field for non-null and non-empty values.
  for (const column of columns) {
    const record = await prisma.products.findFirst({
      where: {
        barcode,
        AND: [{ NOT: { [column]: null } }, { NOT: { [column]: "" } }],
      },
    });

    if (!record) {
      console.log(`Field ${column} is incomplete for barcode ${barcode}`);
      allFieldsComplete = false;
      break; // Break early since we found an incomplete field.
    }
  }
  console.log("allFieldsCompleteeee", allFieldsComplete);
  // If all fields are complete, return true; otherwise, return false.
  return allFieldsComplete;
}
//  TODO: change api key to production key

const getLanguage = (lang) => (lang ? lang.trim() : "en"); // Default to 'en' if undefined or empty
const getValue = (value) => (value ? value.trim() : "");
export async function sendProductsToGepir(request) {
  // const currentDate = new Date().toISOString();
  const productIDs = request.ids;

  // Split productIDs into chunks of 1000
  const productIDChunks = chunkArray(productIDs, 1000);

  for (let chunk of productIDChunks) {
    try {
      const userLastImport = await prisma.products.findMany({
        where: { id: { in: chunk }, deleted_at: null },
      });

      const userLastImportChunk = chunkArray(userLastImport, 1000);

      for (let chunk of userLastImportChunk) {
        const rows = await prisma.$transaction(
          async (transaction) => {
            let updatedRows = [];
            for (let row of chunk) {
              const user = await prisma.users.findUnique({
                where: { id: row.user_id },
                select: { id: true, gcpGLNID: true, gcp_type: true },
              });

              const gtinStatus = row.status === "0" ? "INACTIVE" : "ACTIVE";
              const gtins = "0" + row.barcode;
              const rowLang = getLanguage(row.prod_lang);
              const body = {
                gtin: gtins,
                gtinStatus: gtinStatus,
                gpcCategoryCode: row.gpc_code,
                licenceKey: user.gcpGLNID,
                licenceType: user.gcp_type || "GCP",
                brandName: [
                  { language: rowLang, value: getValue(row.BrandName) },
                ],
                productDescription: [
                  {
                    language: rowLang,
                    value: getValue(row.productnameenglish),
                  },
                ],
                productImageUrl: [
                  {
                    language: rowLang,
                    value: `${imageLiveUrl(row.front_image) || "No Value"}`,
                  },
                ],
                netContent: [{ unitCode: row.unit, value: row.size }],
                countryOfSaleCode: [row.countrySale],
              };

              try {
                const response = await axios.post(
                  `${GLOBAL_API_BASE_URL_PROD}/gtins`,
                  [body],
                  {
                    headers: { APIKey: GLOBAL_GEPIR_PROD_API_KEY },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                  }
                );
                const globalGepir = response.data;
                const feedbackResponse = await axios.get(
                  `${GLOBAL_API_BASE_URL_PROD}/feedback/${globalGepir}`,
                  {
                    headers: { APIKey: GLOBAL_GEPIR_PROD_API_KEY },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                  }
                );
                const feedbackGepir = feedbackResponse.data;
                if (feedbackGepir[0] && feedbackGepir[0].validationErrors) {
                  console.log(feedbackGepir[0].validationErrors[0]);
                  console.log(feedbackGepir[0].validationErrors[0].errors);
                } else {
                  updatedRows.push(row.id);
                }
              } catch (error) {
                console.log(error);
              }
            }
            return updatedRows;

            // increease transaction
          },
          { timeout: 100000 } // set timeout to 50 seconds
        );

        // Update gepirPosted for successfully processed rows
        await prisma.products.updateMany({
          where: { id: { in: rows } },
          data: { gepirPosted: 1 },
        });
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }
}

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export async function sendLicenceToGepir(userIds) {
  const users = await prisma.users.findMany({
    where: {
      id: {
        in: userIds,
      },
      deleted_at: null,
    },
  });

  const userChunks = chunkArray(users, 1000);
  const updatedUserIds = [];
  const errors = [];

  for (const chunk of userChunks) {
    const bodies = chunk.map((user) => ({
      licenceKey: user.gcpGLNID,
      licenceType: user.gcp_type || "GCP",
      licenceStatus: "ACTIVE",
      licenseeName: user.company_name_eng,
      licenseeGLN: user.gln,
      contactPoint: [
        {
          email: user.email,
          telephone: user.mobile,
          website: user.website,
        },
      ],
      address: {
        ...(user.city && {
          addressLocality: { language: "en", value: user.city },
        }),
        ...(user.state && {
          addressRegion: { language: "en", value: user.state },
        }),
        postalCode: user.zip_code,
      },
    }));

    try {
      const response = await axios.post(
        `${GLOBAL_API_BASE_URL_PROD}/licences`,
        bodies,
        {
          headers: { APIKey: GLOBAL_GEPIR_PROD_API_KEY },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Not recommended for production
        }
      );

      console.log("Licences posted:", response.data);

      const feedbackResponse = await axios.get(
        `${GLOBAL_API_BASE_URL_PROD}/feedback/${response.data}`,
        {
          headers: { APIKey: GLOBAL_GEPIR_PROD_API_KEY },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Not recommended for production
        }
      );

      const feedbackData = feedbackResponse.data;

      feedbackData.forEach((feedback) => {
        const user = chunk.find(
          (user) => user.gcpGLNID === feedback.licenceKey
        );
        if (user) {
          if (feedback.validationErrors) {
            console.error("Validation errors:", feedback.validationErrors);
            errors.push({ userId: user.id, errors: feedback.validationErrors });
          } else {
            updatedUserIds.push(user.id);
          }
        }
      });
    } catch (error) {
      console.error(
        "Error posting licence or fetching feedback:",
        error.message
      );
      chunk.forEach((user) =>
        errors.push({ userId: user.id, error: error.message })
      );
    }
  }

  // Update gepirPosted status for all successfully uploaded users in a single call
  if (updatedUserIds.length > 0) {
    await prisma.users.updateMany({
      where: {
        id: {
          in: updatedUserIds,
        },
      },
      data: { gepirPosted: 1 },
    });
  }

  return {
    success: errors.length === 0,
    updatedUsers: updatedUserIds,
    errors,
  };
}
