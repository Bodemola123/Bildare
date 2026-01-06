import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "@/lib/env";

export async function createAndStoreTokensForUser(user: {
  email: string;
  role: string;
}) {
  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: user.email },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await prisma.user.update({
    where: { email: user.email },
    data: { refresh_token: refreshToken },
  });

  return { accessToken, refreshToken };
}
