import { BACKEND_URL } from "../configs/envConfig.js";
import phpserialize from "php-serialize";
import { createError } from "./createError.js";
import prisma from "../prismaClient.js";
// utility function to serialize BigInt values as strings
export const serializeBigInt = (obj) => {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = serializeBigInt(obj[key]);
    }
  }
  return obj;
};
export const parseCartItems = (cartItems) => {
  try {
    // First, try parsing as JSON
    return JSON.parse(cartItems);
  } catch (jsonError) {
    console.error("JSON parsing error:", jsonError.message);

    try {
      // If JSON parsing fails, try parsing as PHP serialized data
      return phpserialize.unserialize(cartItems);
    } catch (phpError) {
      console.error("PHP serialization parsing error:", phpError.message);
      throw new Error("Cannot parse cart items: unknown serialization format.");
    }
  }
};

export const generateRandomTransactionId = (length) => {
  let transactionId = "";
  for (let i = 0; i < length; i++) {
    transactionId += Math.floor(1 + Math.random() * 9).toString();
  }

  return transactionId;
};

export const generateApiKey = (length = 32) => {
  let apiKey = "";
  const characters = "0123456789abcdef";
  for (let i = 0; i < length; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return apiKey;
};

export function imageLiveUrl(documentPath) {
  if (typeof documentPath !== "string" || !documentPath) return null;

  // Replace all backslashes with forward slashes
  let cleanedPath = documentPath.replace(/\\/g, "/");

  // Remove any leading or trailing slashes from the cleaned path
  cleanedPath = cleanedPath.replace(/^\/+|\/+$/g, "");

  // Ensure there's only one slash between the backendUrl and cleanedPath
  const liveUrl = `${BACKEND_URL.replace(/\/+$/, "")}/${cleanedPath}`;

  return liveUrl;
}

export async function getParentUserData(userId) {
  let user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw createError(404, "User not found");
  }

  // Check if the user is a submember and fetch parent data if necessary
  if (
    user.parent_memberID &&
    user.parent_memberID !== "0" &&
    user.parent_memberID !== undefined
  ) {
    const parentUser = await prisma.users.findFirst({
      where: { memberID: user.parent_memberID },
    });

    if (!parentUser) {
      throw createError(404, "Parent member not found");
    }

    return parentUser; // Return the parent member's data
  }

  return user; // Return the original user's data if not a submember
}
