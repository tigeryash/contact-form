import { z } from "zod";

export const signUpSchema = z.object({
  fname: z
    .string()
    .min(1, "This field is required")
    .max(50, "First Name can't exceed 50 characters"),
  lname: z
    .string()
    .min(1, "This field is required")
    .max(50, "Last Name can't exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  queryType: z.enum(["queryType1", "queryType2"], {
    message: "Please select a query type",
  }),
  message: z
    .string()
    .min(1, "This field is required")
    .max(500, "Message can't exceed 500 characters"),

  terms: z.boolean().refine((value) => value === true, {
    message: "To submit the form, please consent to being contacted",
  }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
