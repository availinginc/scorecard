// App Id obatained from the Microsoft Entra portal
export const CLIENT_ID = "39546031-535e-4b98-b59b-bc7638ca2590";

// URL of the CORS proxy server
const BASE_API_URL = `http://localhost:3001/api`;

// Endpoints URLs for Native Auth APIs
export const ENV: any = {
  urlSignupStart: `${BASE_API_URL}/signup/v1.0/start`,
  urlSignupChallenge: `${BASE_API_URL}/signup/v1.0/challenge`,
  urlSignupContinue: `${BASE_API_URL}/signup/v1.0/continue`,
  urlResetPwdChallenge: `${BASE_API_URL}/reset-password/v1.0/challenge`,
};
