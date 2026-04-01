import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, bearer, openAPI } from "better-auth/plugins";
import { db } from "./database";
import { ac, adminRole, customRole, userRole } from "./permission";

export const auth = betterAuth({
  rateLimit: {
    window: 10,
    max: 100,
    enabled: true,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    // sendVerificationEmail: async ({ user, url }) => {
    //   const mail = new MailServer(transporter);
    //   await mail.sendVerificationEmail({
    //     recipient: user.email,
    //     tokenUrl: url,
    //   });
    // },
    // afterEmailVerification: async (data) => {
    //   console.log(data);
    // },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true,
        required: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    admin({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
        custom: customRole,
        superadmin: adminRole,
      },
      defaultRole: "user",
      adminRoles: ["admin", "superadmin"],
    }),
    openAPI(),
    bearer(),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          if (!ctx?.body?.role) {
            return {
              data: { ...user },
            };
          }
          return { data: { ...user, role: ctx?.body?.role } };
        },
      },
    },
  },
});
