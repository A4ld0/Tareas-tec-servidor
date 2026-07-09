import { Document, Schema, model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, "El email debe tener un formato valido"]
    },
    password: {
      type: String,
      required: [true, "La contrasena es requerida"],
      minlength: [8, "La contrasena debe tener minimo 8 caracteres"],
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const User = model<IUser>("User", userSchema);
