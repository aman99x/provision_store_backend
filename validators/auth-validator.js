const {z} = require("zod");

const signupSchema = z.object({
    username : z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be atleas 3 character"})
    .max(255,{message: "Name must not be more than 255 characters"}),
    email : z
    .string({required_error: "Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3, {message: "Email must be atleas 3 character"})
    .max(255,{message: "Email must not be more than 255 characters"}),
    phone : z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone must be atleas 10 character"})
    .max(20,{message: "Phone must not be more than 20 characters"}),
    password : z
    .string({required_error: "Password is required"})
    .trim()
    .min(7, {message: "Password must be atleas 6 character"})
    .max(1024,{message: "Name must not be more than 1024 characters"})
});

module.exports = signupSchema;