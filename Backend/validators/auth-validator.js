const { z } = require('zod');

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least of 6 characters" })
        .max(20, "Password can't be greater than 20 characters"),
})

//creating object schema
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at leat of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),
});

module.exports = {signupSchema, loginSchema};