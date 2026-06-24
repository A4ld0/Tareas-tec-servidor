import { Request, Response, NextFunction, RequestHandler } from "express";

export function allowRoles(allowedRoles: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    const role = req.query.role;

    if (typeof role !== "string") {
      res.status(403).json({
        message: "Access denied"
      });
      return;
    }

    if (allowedRoles.includes(role)) {
      next();
      return;
    }

    res.status(403).json({
      message: "Access denied"
    });
  };
}