import { NextFunction, Request, Response } from "express";
import { AuthTokenPayload, verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Formato de token invalido" });
    return;
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token invalido" });
  }
};
