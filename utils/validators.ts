import { z } from "zod";

export const validators = {
  email: z.string().email(),
  fullname: z.string().min(3, "name is too short"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  name: z.string()
    .min(2, "must be 2 or more letters")
    .regex(/^[a-zA-Z0-9._-]+$/, "remove spaces and special characters")
    .trim(),
  fullName: z.string().min(2, "name too short"),
  phoneNumber: z.string().min(10, "must be 10 or more digits")
    .regex(/^(?:\+44|0)(?:7\d{3}|\d{4})\d{6}$/, "invalid UK phone number"),
  url: z.string(),
  timeHour: z.string().min(4, 'invalid time'),
  min3: z.string().min(3, "value too short"),
  date: z.string().min(3, "invalid date"),
  amount: z.string().min(1, "invalid amount").regex(/^[0-9]+(\.[0-9]*)?$/, "invalid numeric value"),
  withdrawalOrDepositmount: z.string().min(3, "minimum is #100").regex(/^[0-9]+(\.[0-9]*)?$/, "invalid numeric value"),
  invalidRoom: z.string().min(2, "Select a room first"),
  numberOnly: z.string().regex(/^[0-9]+$/, "invalid number"),

};
