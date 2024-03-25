export const cfg = {
  API: {
    HOST:
      process.env.NODE_ENV === "production"
        ? "https://vaisiu-api.vercel.app"
        : "http://localhost:3000",
  },
};
