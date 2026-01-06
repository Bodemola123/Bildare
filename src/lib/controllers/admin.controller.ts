import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= GET ALL USERS ================= */
export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      is_verified: true,
      referralCode: true,
      referred_by: true,
      profile: true,
    },
  });
};

/* ================= DELETE USER ================= */
export const deleteUser = async (user_id: number) => {
  if (!user_id) {
    throw new Error("USER_ID_REQUIRED");
  }

  try {
    await prisma.referralCode.deleteMany({
      where: { user_id },
    });

    await prisma.user.delete({
      where: { user_id },
    });

    return { message: "User deleted successfully", user_id };
  } catch (err: any) {
    if (err.code === "P2025") {
      throw new Error("USER_NOT_FOUND");
    }
    throw err;
  }
};

/* ================= ADMIN LOGIN ================= */
export const adminLogin = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("EMAIL_PASSWORD_REQUIRED");
  }

  email = email.trim().toLowerCase();

  const admin = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new Error("ADMIN_NOT_FOUND");
  }

  if (admin.role !== "admin") {
    throw new Error("NOT_AN_ADMIN");
  }

  if (!admin.password_hash) throw new Error("PASSWORD_NOT_SET");
  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) {
    throw new Error("INVALID_PASSWORD");
  }

  const accessToken = jwt.sign(
    { user_id: admin.user_id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: admin.email },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  await prisma.user.update({
    where: { email },
    data: { refresh_token: refreshToken },
  });

  return {
    user_id: admin.user_id,
    email: admin.email,
    username: admin.username,
    role: admin.role,
    accessToken,
    refreshToken,
  };
};

/* ================= ADMIN LOGOUT ================= */
export const adminLogout = async (adminId: number) => {
  if (!adminId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  await prisma.user.update({
    where: { user_id: adminId },
    data: { refresh_token: null },
  });

  return { message: "Admin logged out successfully" };
};
