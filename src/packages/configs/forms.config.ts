import { envDefaultUserConfig } from "../env/user.env";

const isDev = process.env.NODE_ENV === "development";

export const formsConfig = {
  animationType: {
    direction: "right",
    duration: 500,
  },

  // ✅ Default values for forms.
  //
  // SECURITY: password/confirmPassword are NEVER defaulted, in any
  // environment — there is no legitimate reason to ship a known
  // credential into a password field. fullname/email are only
  // prefilled in development, so production builds never show demo
  // data even if this file is reached by mistake.
  defaultValues: {
    fullname: isDev ? envDefaultUserConfig.DEFAULT_USER_FULLNAME : "",
    email: isDev ? envDefaultUserConfig.DEFAULT_USER_EMAIL : "",
    password: "",
    confirmPassword: "",
    remember: false,
    agreeToTerms: false,
  },
};
