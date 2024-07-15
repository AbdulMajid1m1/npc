import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import {
  ADMIN_JWT_SECRET,
  JWT_SECRET,
  MEMBER_JWT_SECRET,
} from "../configs/envConfig.js";
import prisma from "../prismaClient.js";

export const userAuth = (req, res, next) => {
  const token =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "User authentication required!"));

  jwt.verify(token, MEMBER_JWT_SECRET, (err, userPayload) => {
    if (err) {
      console.log("Error in userAuth", err);
      return next(createError(403, err.message));
    }
    req.user = userPayload;
    next();
  });
};

export const adminAuth = (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) {
      console.log("Error in adminAuth", err);
      return next(createError(403, err.message));
    }
    req.admin = adminPayload;
    next();
  });
};

export const superAdminAuth = (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) return next(createError(403, "Admin token is not valid!"));
    req.admin = adminPayload;

    // check if the admin is super admin
    if (req.admin.is_super_admin !== 1)
      return next(
        createError(
          403,
          "Super admin authentication required to access this resource!"
        )
      );
    next();
  });
};
export const superAdminOrSupervisorAuth = (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) return next(createError(403, "Admin token is not valid!"));
    req.admin = adminPayload;

    // Check if the admin is super admin or if the admin is a supervisor
    if (
      !(
        req.admin.is_super_admin === 1 || req.admin.roles.includes("Supervisor")
      )
    ) {
      return next(
        createError(
          403,
          "Super admin or Supervisor access required to access this resource!"
        )
      );
    }
    next();
  });
};

// Updated Middleware to Allow Super Admin, Supervisor, and Specific Roles
export const superAdminSupervisorAndRolesAuth = (additionalRoles = []) => {
  return (req, res, next) => {
    const token =
      req.cookies.adminToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) return next(createError(401, "Admin authentication required!"));

    jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
      if (err) return next(createError(403, "Admin token is not valid!"));
      req.admin = adminPayload;

      // Check if the admin is super admin, supervisor, or has one of the specified additional roles
      const isSuperAdminOrSupervisor =
        req.admin.is_super_admin === 1 ||
        req.admin.roles.includes("Supervisor");

      const hasAdditionalRoles = additionalRoles.some((role) =>
        req.admin.roles.includes(role)
      );

      if (!(isSuperAdminOrSupervisor || hasAdditionalRoles)) {
        return next(
          createError(
            403,
            `Access requires Super Admin, Supervisor, or one of the following roles: ${additionalRoles.join(
              ", "
            )}`
          )
        );
      }

      next(); // Proceed to the next middleware or route handler
    });
  };
};

export const adminRoleAuth = (requiredRoles = []) => {
  return (req, res, next) => {
    const token =
      req.cookies.adminToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) return next(createError(401, "Admin authentication required!"));

    jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
      if (err) return next(createError(403, "Admin token is not valid!"));
      req.admin = adminPayload;

      // Check if the admin has at least one of the required roles
      const hasRequiredRole = requiredRoles.some((role) =>
        req.admin.roles.includes(role)
      );

      if (!hasRequiredRole) {
        return next(
          createError(
            403,
            `Access requires one of the following roles: ${requiredRoles.join(
              ", "
            )}`
          )
        );
      }

      next(); // Proceed to the next middleware or route handler
    });
  };
};

export const generalAuth = (req, res, next) => {
  const adminToken =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  const userToken =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  // Wrap jwt.verify in a Promise
  const verifyToken = (token, key, type) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        resolve(null); // Resolve to null if no token is provided, to avoid rejecting the promise
        return;
      }
      jwt.verify(token, key, (err, payload) => {
        if (err) {
          console.log("Token verification failed:", err);
          reject(err); // Reject the promise on error
        } else {
          resolve({ type, payload }); // Resolve with the payload and type
        }
      });
    });
  };

  // Use Promise.allSettled to wait for both verifications
  Promise.allSettled([
    verifyToken(adminToken, ADMIN_JWT_SECRET, "admin"),
    verifyToken(userToken, MEMBER_JWT_SECRET, "user"),
  ]).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        const { type, payload } = result.value;
        console.log("type", type);
        if (type === "admin") req.admin = payload;
        if (type === "user") req.user = payload;
      }
    });

    // Proceed only if at least one token is valid
    if (!req.user && !req.admin) {
      next(
        createError(
          401,
          "Authentication required! Please login to access this resource!"
        )
      );
    } else {
      next();
    }
  });
};

export const tokenOrKeyAuth = async (req, res, next) => {
  const adminToken =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  const userToken =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  const apiKey = req.headers["apikey"];

  console.log("adminToken", adminToken);
  console.log("userToken", userToken);
  console.log("apiKey", apiKey);

  // Wrap jwt.verify in a Promise
  const verifyToken = (token, key, type) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        resolve(null); // Resolve to null if no token is provided, to avoid rejecting the promise
        return;
      }
      jwt.verify(token, key, (err, payload) => {
        if (err) {
          console.log("Token verification failed:", err);
          reject(err); // Reject the promise on error
        } else {
          resolve({ type, payload }); // Resolve with the payload and type
        }
      });
    });
  };

  // Use Promise.allSettled to wait for all verifications
  Promise.allSettled([
    verifyToken(adminToken, ADMIN_JWT_SECRET, "admin"),
    verifyToken(userToken, MEMBER_JWT_SECRET, "user"),
  ]).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        const { type, payload } = result.value;
        if (type === "admin") req.admin = payload;
        if (type === "user") req.user = payload;
      }
    });

    // Check API key if no token is valid
    if (!req.user && !req.admin) {
      if (apiKey === "055c1edc391cf2fbe229e4a1bf0e3100") {
        next(); // Valid API key, allow request
      } else {
        // No valid token or API key
        next(
          createError(
            401,
            "Authentication required! Please login or provide a valid API key to access this resource!"
          )
        );
      }
    } else {
      next(); // Proceed if token authentication succeeds
    }
  });
};

// ROles and Permissions based authorization

const permissionCache = {}; // Simple in-memory cache

const fetchPermissionsForRole = async (roleId) => {
  if (!permissionCache[roleId]) {
    const permissions = await prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
    permissionCache[roleId] = permissions.map((p) => p.permission.name);
  }
  return permissionCache[roleId];
};

export const checkPermission =
  (requiredPermissions) => async (req, res, next) => {
    try {
      const adminId = req.admin.adminId; // Assuming admin ID is in req.user
      if (!adminId) throw createError(403, "Unauthorized: Missing admin ID");
      // check if the admin is super admin
      if (req.admin.is_super_admin === 1) return next();

      const adminRoles = await prisma.adminRole.findMany({
        where: { adminId },
      });

      let hasPermission = false;
      for (const adminRole of adminRoles) {
        const permissions = await fetchPermissionsForRole(adminRole.roleId);

        // Support for checking multiple required permissions
        if (Array.isArray(requiredPermissions)) {
          // Check if all required permissions are included in the permissions array
          hasPermission = requiredPermissions.every((rp) =>
            permissions.includes(rp)
          );
        } else {
          // Single permission check for backward compatibility
          hasPermission = permissions.includes(requiredPermissions);
        }

        if (hasPermission) {
          return next();
        }
      }

      throw createError(403, `Unauthorized: Missing required permission(s)`);
    } catch (error) {
      next(error);
    }
  };

export const checkRole = (options) => {
  return async (req, res, next) => {
    if (req.admin) {
      // Admin has all permissions
      return next();
    }
    if (!req.user) {
      // If no user token is found, deny access
      return next(createError(403, "Access denied. No user token found."));
    }

    console.log("Before fetching user:", req.user);

    const userId = req.user.userId;
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    console.log("Fetched user:", user);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // If user is a main member (parent_memberID is "0"), automatically allow
    if (user.parent_memberID === "0" || !user.parent_memberID) {
      req.user = {
        ...user,
        userId: user.id,
        email: user.email,
      };
      // console.log("Main member:", req.user);
      return next();
    }

    // If user is a submember, check roles
    const allowedRoles = options.allowModerator
      ? ["moderator", "operator"]
      : ["operator"];
    if (!allowedRoles.includes(user.user_type)) {
      return res.status(403).json({
        error: `Access denied. Allowed roles for this operation: ${allowedRoles.join(
          ", "
        )}, but your role is ${user.user_type}.`,
      });
    }

    // Fetch parent member data
    const parentMember = await prisma.users.findFirst({
      where: { memberID: user.parent_memberID },
    });

    console.log("Fetched parent member:", parentMember);

    if (!parentMember) {
      return next(createError(404, "Parent member not found"));
    }

    // Adjust the format of req.user to match the structure used in the token
    req.user = {
      ...parentMember,
      userId: parentMember.id, // Ensure the userId is set to the parent member's id
      email: parentMember.email,
    };

    console.log("After setting parent member:", req.user);

    req.submember = {
      userId: user.id,
      email: user.email,
      user_type: user.user_type,
    };

    next();
  };
};
