import express, { Request, Response } from "express";
import { allowRoles } from "./middlewares/allowRoles";

const app = express();
const PORT = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Public route"
  });
});

app.get("/admin", allowRoles(["admin"]), (_req: Request, res: Response) => {
  res.json({
    message: "Welcome admin"
  });
});

app.get("/reports", allowRoles(["admin", "manager"]), (_req: Request, res: Response) => {
  res.json({
    message: "Reports area"
  });
});

app.get("/inventory", allowRoles(["employee", "manager"]), (_req: Request, res: Response) => {
  res.json({
    message: "Inventory area"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});