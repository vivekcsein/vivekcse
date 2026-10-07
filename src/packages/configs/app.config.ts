import { envAppConfig } from "../env/app.env";
import { envClientConfig } from "../env/client.env";
import { envPublicConfig } from "../env/public.env";
import { themeConfig } from "./theme.config";

const apiBaseUrl = `${envClientConfig.clientOrigin}/${envClientConfig.clientPrefix}`;

const appConfig = {
  // Application
  app: {
    version: envPublicConfig.APP_VERSION,
    environment: envAppConfig.NODE_ENV,
    locale: "en",
    timezone: "UTC",
  },

  // Website
  site: {
    name: envPublicConfig.APP_NAME,
    title: envPublicConfig.SITE_TITLE,
    description: envPublicConfig.APP_DESCRIPTION,
    url: envPublicConfig.SITE_URL,
    basePath: envPublicConfig.BASE_PATH,
    logo: envPublicConfig.LOGO_URL,
    ogImage: envPublicConfig.OG_IMAGE_URL,
    theme: envPublicConfig.ACTIVE_THEME,
    style: envPublicConfig.ACTIVE_STYLE,
    titleTemplate: "%s | VivekCSE Portfolio",
  },

  // Author
  author: {
    name: envPublicConfig.AUTHOR_NAME,
    handle: envPublicConfig.AUTHOR_HANDLE,
    email: envPublicConfig.AUTHOR_EMAIL,
    quote: envPublicConfig.AUTHOR_QUOTE,
  },

  // Social Profiles
  social: {
    twitter: {
      name: "Twitter",
      handle: envPublicConfig.TWITTER,
      cardType: "summary_large_image",
      icon: "",
    },

    linkedin: {
      name: "LinkedIn",
      handle: envPublicConfig.LINKEDIN,
      cardType: "summary_large_image",
      icon: "",
    },

    github: {
      name: "GitHub",
      handle: envPublicConfig.GITHUB,
      cardType: "summary_large_image",
      icon: "",
    },
  },

  // Repository / Git
  repository: {
    repositoryName: envPublicConfig.AUTHOR_NAME,
    repositoryUrl: `https://github.com/${envPublicConfig.AUTHOR_HANDLE}/create-next-template/`,
    imageUrl: `https://raw.githubusercontent.com/${envPublicConfig.AUTHOR_HANDLE}/create-next-template/refs/heads/main/public/`,
  },

  // Search Engine Verification
  verification: {
    google: envPublicConfig.GOOGLE_VERIFICATION,
  },

  // Application Logging
  logging: {
    enabled: envAppConfig.NODE_ENV !== "production",
    stackTrace: envAppConfig.NODE_ENV !== "production",
  },

  // HTTP Headers
  headers: {
    requestId: "X-Request-Id",
    traceId: "X-Trace-Id",
    poweredBy: "X-Powered-By",
  },

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },

  // Theme
  theme: themeConfig,

  // Animation / Motion
  motion: {
    duration: {
      instant: 100,
      fast: 150,
      base: 250,
      slow: 400,
    },
  },

  // Application Routes
  routes: {
    // Primary Pages
    home: "/",
    about: "/about",
    projects: "/projects",
    marketplace: "/marketplace",
    notFound: "/404",

    // Content
    articles: {
      base: "/content",
      resources: "resources",
      docs: "/docs",
      tutorials: "/tutorials",
      journey: "/journey",
      techStack: "/tech-stack",
    },

    // Services
    services: {
      webDevelopment: "/services/web-development",
      performance: "/services/performance-optimization",
      backend: "/services/backend-development",
      authenticationSecurity: "/services/authentication-security",
      seoAdsMonetization: "/services/seo-ads-monetization",
      augmentedReality: "/services/ar-experiences",
      animation: "/services/animation",
      figmaToCode: "/services/figma-to-code",
    },

    // Legal / Company
    legal: {
      contact: "/contact",
      privacy: "/privacy",
      terms: "/terms",
    },

    // System / SEO Assets
    system: {
      favicon: "/favicon.ico",
      logo: "/logo.png",
      robots: "/robots.txt",
      sitemap: "/sitemap.xml",
    },

    auth: {
      signIn: "/auth/signin",
      signUp: "/auth/signup",
      profile: "/profile",
    },
  },

  // API
  api: {
    baseUrl: apiBaseUrl,
  },
} as const;

export default appConfig;
