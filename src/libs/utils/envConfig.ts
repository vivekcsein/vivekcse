// env configuration
const envConfigFun = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      PORT: process.env.PORT,
    };
  } else {
    return {
      PORT: 7163,
    };
  }
};

export const envConfig = envConfigFun();
