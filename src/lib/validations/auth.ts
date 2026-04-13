import * as z from "zod";

const passSchema = z.string()
    .min(8, 'password must be at least 8 characters')
    .regex(/[A-Z]/, 'One uppercase')
    .regex(/[a-z]/, 'One lowercase')
    .regex(/[0-9]/,'One digit')
    .regex(/[^A-Za-z0-9]/, 'One special character')

const emailSchema = z.string().email("incorrect email address")    

export const signupSchema = z.object({
    name: z.string().min(3, "name should has minimize 3 characters"),
    email: emailSchema,
    jobTitle: z.string().optional(),
    password: passSchema,
    confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "unmatch password",
    path:["confirmPassword"]
  })

export type SignupInput = z.infer<typeof signupSchema>;
