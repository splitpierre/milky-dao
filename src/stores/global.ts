export const STORE_ENV: any = "production";

export const STORE_API = {
  api_url:
    STORE_ENV === "production"
      ? "https://milky-dao-api.herokuapp.com"
      : "http://localhost:3005",
};
