import { z, ZodAny } from "zod";

export const Register = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    retypepassword: z.string().min(8),
    phonenumber: z.number().min(8).max(8),
    image: z.string().optional(),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Passwords don't match",
    path: ["retypepassword"],
  });

export const Login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const Credentials = z
  .object({
    email: z.string().email(),
    password: z.string().optional(),
    retypepassword: z.string().optional(),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Passwords don't match",
    path: ["retypepassword"],
  })
  .refine((data) => !data.password || data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  });

export const Profile = z
  .object({
    name: z.string(),
    phonenumber: z.string().length(8, { message: "Invalid Phone Number" }),
    bio: z.string().optional(),
    image: z.string().optional(),
  })
  .refine((data) => data.name.length >= 3 && data.name.length <= 30, {
    message: "Invalid Name",
    path: ["name"],
  });
