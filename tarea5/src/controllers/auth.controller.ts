import { Request, Response } from "express";
import { emailRegex, User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

interface RegisterBody {
  name?: unknown;
  email?: unknown;
  password?: unknown;
}

interface LoginBody {
  email?: unknown;
  password?: unknown;
}

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

const hasDuplicateKeyCode = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  return (error as { code?: unknown }).code === 11000;
};

export const register = async (
  req: Request<object, object, RegisterBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
      res.status(400).json({ message: "name, email y password son requeridos" });
      return;
    }

    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "El email debe tener un formato valido" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: "La contrasena debe tener minimo 8 caracteres" });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      res.status(409).json({ message: "El correo ya existe" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (hasDuplicateKeyCode(error)) {
      res.status(409).json({ message: "El correo ya existe" });
      return;
    }

    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (
  req: Request<object, object, LoginBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      res.status(400).json({ message: "email y password son requeridos" });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      res.status(401).json({ message: "Credenciales invalidas" });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciales invalidas" });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Error al iniciar sesion" });
  }
};

export const me = (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "Usuario no autenticado" });
    return;
  }

  res.json({
    message: "Usuario autenticado",
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
};
