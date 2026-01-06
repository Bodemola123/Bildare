import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "@/lib/email";
import { generateOtp } from "./generateOtp";


/* ================= 1. SIGNUP ================= */
export const signupUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("EMAIL_PASSWORD_REQUIRED");

  email = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otp_expires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  // USER EXISTS BUT NOT VERIFIED → resend OTP
  if (existingUser && !existingUser.is_verified) {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password_hash: hashedPassword,
        otp,
        otp_expires,
        otp_request_count: { increment: 1 },
        otp_request_date: new Date(),
      },
    });

    await sendOtpEmail(email, otp);

    return {
      message: "OTP resent. Please verify your email.",
      email,
      username: updatedUser.username,
    };
  }

  // USER EXISTS AND VERIFIED → block
  if (existingUser && existingUser.is_verified) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }

  // NEW USER → create
  const baseUsername = email.split("@")[0];
  const username = `${baseUsername}_${Math.floor(Math.random() * 10000)}`;

  const newUser = await prisma.user.create({
    data: {
      email,
      password_hash: hashedPassword,
      otp,
      otp_expires,
      is_verified: false,
      username,
      interests: undefined,
      otp_request_count: 1,
      otp_request_date: new Date(),
      profile: { create: {} },
    },
  });

  await sendOtpEmail(email, otp);

  return {
    message: "OTP sent to email. Please verify within 10 minutes.",
    email,
    username: newUser.username,
  };
};

/* ================= 2. RESEND OTP ================= */
export const resendOtpForUser = async (email: string) => {
  if (!email) throw new Error("EMAIL_REQUIRED");

  email = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("USER_NOT_FOUND");
  if (user.is_verified) throw new Error("ALREADY_VERIFIED");

  const today = new Date().toISOString().split("T")[0];
  const lastRequestDay = user.otp_request_date?.toISOString().split("T")[0];

  let requestCount = user.otp_request_count;
  if (today !== lastRequestDay) requestCount = 0;

  if (requestCount >= 5) {
    throw new Error("MAX_OTP_REQUESTS_REACHED");
  }

  const otp = generateOtp();
  const otp_expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      otp,
      otp_expires,
      otp_request_count: requestCount + 1,
      otp_request_date: new Date(),
    },
  });

  await sendOtpEmail(email, otp);

  return { message: "New OTP sent to email." };
};

/* ================= 3. VERIFY OTP ================= */
export const verifyUserOtp = async (email: string, otp: string) => {
  if (!email || !otp) throw new Error("EMAIL_OTP_REQUIRED");

  email = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("USER_NOT_FOUND");
  if (user.is_verified) throw new Error("ALREADY_VERIFIED");

  if (!user.otp || !user.otp_expires || new Date() > user.otp_expires)
    throw new Error("OTP_EXPIRED");

  if (user.otp !== otp) throw new Error("INVALID_OTP");

  await prisma.user.update({
    where: { email },
    data: { otp: null, otp_expires: null },
  });

  return { message: "OTP verified. Now complete your profile." };
};

/* ================= COMPLETE PROFILE ================= */
export const completeUserProfile = async (data: {
  email: string;
  username: string;
  role: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  interests?: string[] | null;
  social_links?: Record<string, string> | null;
  referralCode?: string | null;
}) => {
  let {
    email,
    username,
    role,
    first_name,
    last_name,
    bio,
    avatar_url,
    interests,
    social_links,
    referralCode,
  } = data;

  if (!email || !username || !role) throw new Error("EMAIL_USERNAME_ROLE_REQUIRED");

  email = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) throw new Error("USER_NOT_FOUND");

  const usernameTaken = await prisma.user.findUnique({ where: { username } });
  if (usernameTaken && usernameTaken.user_id !== existingUser.user_id) {
    throw new Error("USERNAME_TAKEN");
  }

  // REFERRAL HANDLING
  let referredByUserId: number | null = null;
  if (referralCode) {
    const ref = await prisma.referralCode.findUnique({ where: { code: referralCode } });
    if (!ref) throw new Error("INVALID_REFERRAL_CODE");
    if (ref.user_id === existingUser.user_id) throw new Error("SELF_REFERRAL_NOT_ALLOWED");
    if (existingUser.referred_by) throw new Error("REFERRAL_ALREADY_USED");
    referredByUserId = ref.user_id;

    await prisma.referralCode.update({
      where: { code: referralCode },
      data: { uses: { increment: 1 } },
    });
  }

  const cleanedUsername = username.replace(/[^a-zA-Z0-9]/g, "");
  const myReferralCode = cleanedUsername.slice(0, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000);

  const updatedUser = await prisma.user.update({
    where: { user_id: existingUser.user_id },
    data: {
      username,
      role,
      is_verified: true,
      interests: interests ?? undefined,
      referred_by: referredByUserId,
      referralCode: myReferralCode,
      profile: {
        update: {
          first_name,
          last_name,
          bio,
          avatar_url,
          social_links: social_links ?? undefined,
        },
      },
    },
    include: { profile: true },
  });

  await prisma.referralCode.create({
    data: { code: myReferralCode, user_id: updatedUser.user_id },
  });

  const accessToken = jwt.sign(
    { email: updatedUser.email, role: updatedUser.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: updatedUser.email },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    message: "Profile completed successfully!",
    user: {
      user_id: updatedUser.user_id,
      username: updatedUser.username,
      role: updatedUser.role,
      referralCode: myReferralCode,
      profile: updatedUser.profile,
      accessToken,
      refreshToken,
    },
  };
};

/* ================= LOGIN ================= */
export const loginUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("EMAIL_PASSWORD_REQUIRED");

  email = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user) throw new Error("USER_NOT_FOUND");
  if (!user.is_verified) throw new Error("EMAIL_NOT_VERIFIED PLEASE_VERIFY");

  if (!user.password_hash) throw new Error("PASSWORD_NOT_SET");

const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("INVALID_PASSWORD");

  const accessToken = jwt.sign(
    { email: user.email, role: user.role, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { refresh_token: refreshToken },
    include: { profile: true },
  });

  return {
    message: "Login successful",
    user: {
      user_id: updatedUser.user_id,
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
      profile: updatedUser.profile,
      referralCode: updatedUser.referralCode || null,
      referred_by: updatedUser.referred_by || null,
      accessToken,
      refreshToken,
    },
  };
};

/* ================= LOGOUT ================= */
export const logoutUser = async (userId: number) => {
  if (!userId) throw new Error("NOT_AUTHENTICATED");

  await prisma.user.update({
    where: { user_id: userId },
    data: { refresh_token: null },
  });

  return { message: "Logged out successfully" };
};

/* ================= REFRESH TOKEN ================= */
export const refreshAccessToken = async (token: string) => {
  if (!token) throw new Error("REFRESH_TOKEN_REQUIRED");

  const user = await prisma.user.findFirst({
    where: { refresh_token: token },
  });

  if (!user) throw new Error("INVALID_REFRESH_TOKEN");

  jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (err) => {
    if (err) throw new Error("INVALID_REFRESH_TOKEN");
  });

  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return { accessToken };
};