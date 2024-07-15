import prisma from "../../prismaClient.js";
import { laravelPrisma, oldGs1Prisma } from "../../prismaMultiClinets.js";

export const generateGTIN13 = (barcode) => {
  // Remove any spaces from the barcode
  barcode = barcode.replace(/\s/g, "");

  // Pad the barcode with trailing zeros if its length is less than 12
  barcode = barcode.padEnd(12, "0");

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(barcode[i]);
    // Alternate weighting of 3 and 1 from right to left (starting with 1 for the rightmost digit)
    const multiplier = i % 2 === 0 ? 1 : 3;
    sum += digit * multiplier;
  }

  // Calculate check digit
  const checkDigit = (10 - (sum % 10)) % 10;

  // Return the complete 13-digit GTIN
  return barcode + checkDigit;
};

function calculateCheckDigit(gtinWithoutCheckDigit) {
  const digits = gtinWithoutCheckDigit.split("").map(Number);
  let sum = 0;

  // EAN-13 check digit calculation (modulo-10 algorithm)
  for (let i = 0; i < digits.length; i++) {
    sum += i % 2 === 0 ? digits[i] * 1 : digits[i] * 3;
  }

  const remainder = sum % 10;
  const checkDigit = remainder === 0 ? 0 : 10 - remainder;

  return checkDigit.toString();
}

function lengthSeven(productRange) {
  const range = parseInt(productRange, 10);
  if (isNaN(range) || range < 0) {
    console.error("Invalid product range:", productRange);
    return "false";
  }
  return range.toString().padStart(5, "0");
}

function lengthEight(productRange) {
  const range = parseInt(productRange, 10);
  if (isNaN(range) || range < 0) {
    console.error("Invalid product range:", productRange);
    return "false";
  }
  return range.toString().padStart(4, "0");
}

function lengthNine(productRange) {
  const range = parseInt(productRange, 10);
  if (isNaN(range) || range < 0) {
    console.error("Invalid product range:", productRange);
    return "false";
  }
  return range.toString().padStart(3, "0");
}

function lengthTen(productRange) {
  const range = parseInt(productRange, 10);
  if (isNaN(range) || range < 0) {
    console.error("Invalid product range:", productRange);
    return "false";
  }
  return range.toString().padStart(2, "0");
}

function lengthEleven(productRange) {
  const range = parseInt(productRange, 10);
  if (isNaN(range) || range < 0) {
    console.error("Invalid product range:", productRange);
    return "false";
  }
  return range.toString().padStart(1, "0");
}

function constructBarcode(gcpGLNID, productRange) {
  const gcpLength = gcpGLNID.length;
  let barcodeNumber = "";

  let combined = gcpGLNID + productRange.toString();
  if (combined.length > 12) {
    return "false";
  }

  switch (gcpLength) {
    case 7:
      barcodeNumber = gcpGLNID + lengthSeven(productRange);
      break;
    case 8:
      barcodeNumber = gcpGLNID + lengthEight(productRange);
      break;
    case 9:
      barcodeNumber = gcpGLNID + lengthNine(productRange);
      break;
    case 10:
      barcodeNumber = gcpGLNID + lengthTen(productRange);
      break;
    case 11:
      barcodeNumber = gcpGLNID + lengthEleven(productRange);
      break;
    default:
      return "false"; // This will handle any GCP lengths that are not supported
  }
  return barcodeNumber;
}

export async function calculateGLN(
  initialProductsCount,
  gcpGLNID,
  userType = "new"
) {
  const maxAttempts = 100;
  let attempts = 0;
  let barcodeNumber = "";
  let gtinWithCheckDigit;
  let productsCount = initialProductsCount;

  if (![7, 8, 9, 10, 11].includes(gcpGLNID?.length)) {
    console.error(
      `Unsupported GCP length of ${gcpGLNID?.length}. Only lengths of 7, 8, 9, 10, and 11 are supported.`
    );
    throw new Error(
      "Unsupported GCP length. Only lengths of 7, 8, 9, 10, and 11 are supported."
    );
  }

  for (attempts = 0; attempts < maxAttempts; attempts++) {
    const productRange = parseInt(productsCount) + parseInt(attempts);
    barcodeNumber = constructBarcode(gcpGLNID, productRange);

    if (barcodeNumber === "false") {
      console.error(
        "Failed to generate barcode based on GCP and product range."
      );
      throw new Error(
        "Failed to generate barcode based on GCP and product range."
      );
    }

    gtinWithCheckDigit = barcodeNumber + calculateCheckDigit(barcodeNumber);
    console.log(
      `Attempt ${attempts + 1}: Generated GTIN: ${gtinWithCheckDigit}`
    );

    // Check if the generated GLN already exists in the add_member_gln_products table
    console.log(
      `Checking if GLN ${gtinWithCheckDigit} exists in current database...`
    );
    const existingGLN = await prisma.add_member_gln_products.findFirst({
      where: { GLNBarcodeNumber: gtinWithCheckDigit },
    });

    // If userType is old, check the oldGs1Prisma.Location.GLN table as well
    let oldGLN = null;
    if (userType === "old") {
      console.log(
        `Checking if GLN ${gtinWithCheckDigit} exists in oldGs1Prisma database for userType "old"...`
      );
      oldGLN = await oldGs1Prisma.Location.findFirst({
        where: { GLN: gtinWithCheckDigit },
      });
      if (oldGLN) {
        console.log(
          `Duplicate GLN found in oldGs1Prisma.Location.GLN: ${gtinWithCheckDigit}`
        );
      }
    }

    if (!existingGLN && !oldGLN) {
      console.log(`Unique GLN found: ${gtinWithCheckDigit}`);
      return {
        barcode: gtinWithCheckDigit,
        newCounter: parseInt(productsCount) + parseInt(attempts),
      };
    } else {
      console.log(
        `Duplicate GLN detected: ${gtinWithCheckDigit}. Attempting a new GLN with attempts: ${
          attempts + 1
        }`
      );
    }
  }

  console.error("Exceeded maximum attempts to generate a unique GLN.");
  throw new Error("Exceeded maximum attempts to generate a unique GLN.");
}

export function isValidGCPInBarcode(barcode, gcpGLNID) {
  if (!barcode || !gcpGLNID) {
    return false;
  }

  const gcpLength = gcpGLNID.length;
  const barcodeGCP = barcode.substring(0, gcpLength);
  console.log(`Barcode GCP: ${barcodeGCP}, GCP GLN ID: ${gcpGLNID}`);
  console.log(barcodeGCP === gcpGLNID);
  return barcodeGCP === gcpGLNID;
}

async function checkBarcodeExistsInV2Db(barcode) {
  const existingProduct = await prisma.products.findFirst({
    where: { barcode: barcode },
  });
  return existingProduct !== null;
}

async function checkBarcodeExists(barcode) {
  console.log(`Checking barcode in current products table: ${barcode}`);
  const existingProduct = await prisma.products.findFirst({
    where: { barcode: barcode },
  });
  if (existingProduct) {
    console.log(`Barcode ${barcode} found in current products table`);
  }

  console.log(`Checking barcode in old products table: ${barcode}`);
  const oldProduct = await oldGs1Prisma.Product.findFirst({
    where: { BarCode: barcode },
  });
  if (oldProduct) {
    console.log(`Barcode ${barcode} found in old products table`);
  }

  console.log(`Checking barcode in Laravel products table: ${barcode}`);
  const laravelProduct = await laravelPrisma.products.findFirst({
    where: { barcode: barcode },
  });
  if (laravelProduct) {
    console.log(`Barcode ${barcode} found in Laravel products table`);
  }

  // Return true if the barcode exists in any of the tables
  const barcodeExists =
    existingProduct !== null || oldProduct !== null || laravelProduct !== null;
  if (barcodeExists) {
    console.log(`Barcode ${barcode} exists in one of the tables.`);
  } else {
    console.log(`Barcode ${barcode} does not exist in any table.`);
  }
  return barcodeExists;
}

export async function generateProdcutGTIN(
  gcpGLNID,
  productsCount,
  userType = "new"
) {
  const gcpLength = gcpGLNID?.length;
  // console.log(`Starting GTIN generation with GCP length: ${gcpLength}`);
  let attempts = 0;
  const maxAttempts = 5000;
  let uniqueBarcodeFound = false;
  let finalBarcode = "";

  if (![7, 8, 9, 10, 11].includes(gcpLength)) {
    throw new Error(
      `Unsupported GCP length of ${gcpLength}. Only lengths of 7, 8, 9, 10, and 11 are supported.`
    );
  }

  while (!uniqueBarcodeFound && attempts < maxAttempts) {
    attempts++;
    const productRange = parseInt(productsCount) + parseInt(attempts);
    if (attempts < 5) {
      console.log(`Generating barcode for product range: ${productRange}`);
    }
    const barcodeNumber = constructBarcode(gcpGLNID, productRange);

    if (barcodeNumber === "false") {
      throw new Error(
        `Barcode length exceeds the maximum limit of 12 digits without the check digit for GCP: ${gcpGLNID} and range: ${productRange}`
      );
    }

    const gtinWithCheckDigit =
      barcodeNumber + calculateCheckDigit(barcodeNumber);
    if (gtinWithCheckDigit.includes("X")) {
      console.error(
        `Failed to calculate check digit for barcode ${barcodeNumber}`
      );
      continue;
    }

    console.log(`Attempt ${attempts}: Generated GTIN ${gtinWithCheckDigit}`);
    let barcodeExists;
    if (userType === "old") {
      barcodeExists = await checkBarcodeExists(gtinWithCheckDigit);
    } else {
      barcodeExists = await checkBarcodeExistsInV2Db(gtinWithCheckDigit);
    }

    if (!barcodeExists) {
      uniqueBarcodeFound = true;
      finalBarcode = gtinWithCheckDigit;
      console.log(`Unique GTIN found: ${finalBarcode}`);
    } else {
      console.log(`Duplicate GTIN detected: ${gtinWithCheckDigit}`);
    }
  }

  if (!uniqueBarcodeFound) {
    console.error(
      "Failed to generate a unique barcode after maximum attempts."
    );
    throw new Error(
      "Failed to generate a unique barcode after maximum attempts. For GCP: " +
        gcpGLNID
    );
  }
  console.log(
    "newCounter",
    "prductCOunt",
    " ",
    productsCount,
    " attempt ",
    attempts
  );
  return {
    gtinWithCheckDigit: finalBarcode,
    newCounter: parseInt(productsCount) + parseInt(attempts),
  };
}

export async function fetchAvailableBarcodeTransactional(
  prismaTransaction,
  userId
) {
  // console.log("fetchAvailableBarcodeTransactional user id is: ", userId);
  const availableBarcode = await prismaTransaction.skipped_barcodes.findFirst({
    where: {
      user_id: userId,
      deleted_at: null,
    },
    orderBy: {
      created_at: "asc",
    },
  });
  // console.log("availableBarcode", availableBarcode);
  if (availableBarcode) {
    // Mark the barcode as used by setting deleted_at
    await prismaTransaction.skipped_barcodes.update({
      where: { id: availableBarcode.id },
      data: { deleted_at: new Date() },
    });
    return (
      availableBarcode.barcode + calculateCheckDigit(availableBarcode.barcode)
    );
  }

  return null;
}

export async function fetchAvailableGLNTransactional(
  prismaTransaction,
  userId
) {
  const availableGLN = await prismaTransaction.skipped_GLN_barcodes.findFirst({
    where: {
      user_id: userId,
      deleted_at: null,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  if (availableGLN) {
    // Mark the GLN as used by setting deleted_at
    await prismaTransaction.skipped_GLN_barcodes.update({
      where: { id: availableGLN.id },
      data: { deleted_at: new Date() },
    });
    return availableGLN.GLN;
  }

  return null;
}

// Rest of your code remains unchanged

/// SSCC ....

function formatSSCC(productRange, totalLength) {
  let range = parseInt(productRange, 10).toString();
  if (range.length > totalLength) return "false";
  return range.padStart(totalLength, "0");
}

function ssccLengthEight(productRange) {
  return formatSSCC(productRange, 8);
}

function ssccLengthNine(productRange) {
  return formatSSCC(productRange, 9);
}

function ssccLengthTen(productRange) {
  return formatSSCC(productRange, 10);
}

function ssccLengthEleven(productRange) {
  return formatSSCC(productRange, 11);
}

function ssccLengthTwelve(productRange) {
  return formatSSCC(productRange, 12);
}

// SSCC Barcode generation function (convert from PHP to JavaScript)

export async function generateSSCCBarcode(gcpGLNID, productCount) {
  const gcpLength = gcpGLNID.toString().length;
  if (gcpLength < 8 || gcpLength > 12) return "false";

  let barcodeNumber;
  switch (gcpLength) {
    case 8:
      barcodeNumber = gcpGLNID + ssccLengthEight(productCount);
      break;
    case 9:
      barcodeNumber = gcpGLNID + ssccLengthNine(productCount);
      break;
    case 10:
      barcodeNumber = gcpGLNID + ssccLengthTen(productCount);
      break;
    case 11:
      barcodeNumber = gcpGLNID + ssccLengthEleven(productCount);
      break;
    case 12:
      barcodeNumber = gcpGLNID + ssccLengthTwelve(productCount);
      break;
    default:
      return "false";
  }

  if (barcodeNumber === "false") return "false";

  // // Check for trashed SSCC (assuming you have a function for this)
  // const trashedSSCC = await checkSSCCTrashed(user); // Adjust as needed for your application
  // if (trashedSSCC) {
  //     // Handle trashed SSCC case
  //     // Implement logic as needed based on your application's requirements
  // }

  return barcodeNumber + calculateCheckDigit(barcodeNumber);
}
