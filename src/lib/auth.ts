
import { PrismaClient } from "@prisma/client/extension";
import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"
// * import prisma from ./prisma


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // give gmail host name here
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins:[process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn:false,
    requireEmailVerification:true
  },
   emailVerification: {
    sendOnSignUp:true,
    sendVerificationEmail: async ( { user, url, token }, request) => {
      const verificationEmail =`${process.env.APP_URL}/verify-email?token=${token}`
      const info = await transporter.sendMail({
        from:'prisma Blog <paypal572874@gmail.com>',
        to:user.email,
        subject:"Am i that competant",
        text:"I failed a thousands battle but not now ",
        html:`<h1>Hello world </h1>`
      })
      console.log("Message send",info.messageId)
    }
  },
});
