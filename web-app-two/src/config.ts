// App Id obatained from the Microsoft Entra portal
export const CLIENT_ID = "39546031-535e-4b98-b59b-bc7638ca2590";

// URL of the CORS proxy server
const BASE_API_URL = `http://localhost:3001/api`;
const REDIRECT_URI = "https://localhost:3000";

// Endpoints URLs for Native Auth APIs
export const ENV: any = {
  REDIRECT_URI,
  urlOauthInit: `${BASE_API_URL}/oauth2/v2.0/initiate`,
  urlOauthChallenge: `${BASE_API_URL}/oauth2/v2.0/challenge`,
  urlOauthToken: `${BASE_API_URL}/oauth2/v2.0/token`,

  urlSignupStart: `${BASE_API_URL}/signup/v1.0/start`,
  urlSignupChallenge: `${BASE_API_URL}/signup/v1.0/challenge`,
  urlSignupContinue: `${BASE_API_URL}/signup/v1.0/continue`,

  urlResetPwdStart: `${BASE_API_URL}/resetpassword/v1.0/start`,
  urlResetPwdChallenge: `${BASE_API_URL}/resetpassword/v1.0/challenge`,
  urlResetPwdContinue: `${BASE_API_URL}/resetpassword/v1.0/continue`,
  urlResetPwdSubmit: `${BASE_API_URL}/resetpassword/v1.0/submit`,
  urlResetPwdPollComp: `${BASE_API_URL}/resetpassword/v1.0/poll_completion`,
};
