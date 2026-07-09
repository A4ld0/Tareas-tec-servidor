import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../models/User";

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

const getJwtSecret = (): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET no esta definido en las variables de entorno.");
  }

  return jwtSecret;
};

export const generateToken = (payload: AuthTokenPayload): string => {
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1h") as SignOptions["expiresIn"];

  return jwt.sign(payload, getJwtSecret(), { expiresIn });
};

export const verifyToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded === "string") {
    throw new Error("Token invalido.");
  }

  const { id, email, role } = decoded;

  if (
    typeof id !== "string" ||
    typeof email !== "string" ||
    (role !== "user" && role !== "admin")
  ) {
    throw new Error("Token invalido.");
  }

  return { id, email, role };
};
