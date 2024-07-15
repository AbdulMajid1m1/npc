import prisma from "../../prismaClient.js";

export const createMemberLogs = async (data) => {
  try {
    return await prisma.member_history_logs.create({
      data,
    });
  } catch (error) {
    // handle the error gracefully
    console.log(error);
  }
};

export const createAdminLogs = async (data) => {
  try {
    return await prisma.admin_history_logs.create({
      data,
    });
  } catch (error) {
    // handle the error gracefully
    console.log(error);
  }
};

export const createLogs = async (req, userLog, adminLog) => {
  try {
    const logPromises = [];

    // If there's an admin ID, create admin and member logs
    if (req?.admin?.adminId) {
      if (adminLog) {
        logPromises.push(createAdminLogs(adminLog)); // Add admin log to the promise array
      }
      logPromises.push(createMemberLogs(userLog)); // Add member log to the promise array
    }

    // If there's a user ID, create a member log
    if (req?.user?.userId) {
      logPromises.push(createMemberLogs(userLog)); // Add member log to the promise array
    }

    // Run all log creations in parallel
    await Promise.all(logPromises);
  } catch (error) {
    console.error("Error creating logs:", error);
    throw error;
  }
};

export const createGtinSubscriptionHistory = async (data) => {
  try {
    return await prisma.gtin_subscription_histories.createMany({
      data,
    });
  } catch (error) {
    console.error("Error creating GTIN Subscription History:", error);
  }
};

export const createOtherProductsSubscriptionHistory = async (data) => {
  try {
    return await prisma.other_products_subscription_histories.createMany({
      data,
    });
  } catch (error) {
    // Handle the error gracefully
    console.error("Error creating Other Products Subscription History:", error);
  }
};

export const createOldMemberGtinSubscriptionHistory = async (data) => {
  try {
    return await prisma.old_gtin_subscription_histories.createMany({
      data,
    });
  } catch (error) {
    console.error("Error creating GTIN Subscription History:", error);
  }
};

export const createOldMemberOtherProductsSubscriptionHistory = async (data) => {
  try {
    return await prisma.old_other_products_subscription_histories.createMany({
      data,
    });
  } catch (error) {
    // Handle the error gracefully
    console.error("Error creating Other Products Subscription History:", error);
  }
};
