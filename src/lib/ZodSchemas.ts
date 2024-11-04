import { z } from "zod";

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

export const AddEvent = z.object({
  name: z.string().min(2, "Name is required"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  estimatedAttendees: z
    .string()
    .min(1, "You need at least 10 people")
    .max(5, "Maximum is 99,999"),
  askedAmount: z
    .string()
    .min(2, "Minimum required is above 10 د.ت")
    .max(6, "Maximum allowed is bellow 999,999 د.ت"),
  description: z
    .string()
    .min(20, "Minimum 20 characters ")
    .max(500, "A maximum of 500 characters"),
  location: z.string().min(4, "Full Location is required"),
  type: z.string().min(3, "Type is required"),
});
