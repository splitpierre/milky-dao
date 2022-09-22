const ENVIRONMENT = import.meta.env.PUBLIC_ENVIRONMENT;
export const SYSTEM_CONFIG = {
  environment: ENVIRONMENT,
  site_url:
    ENVIRONMENT === "production"
      ? "https://milky-dao.vercel.app/"
      : "http://localhost:3000/",
  api_path:
    ENVIRONMENT === "production"
      ? "https://milky-dao-api.herokuapp.com/"
      : "http://localhost:3005/",
};
