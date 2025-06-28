require("dotenv").config();

const TENANT_SUBDOMAIN =
  process.env.TENANT_SUBDOMAIN || "Enter_the_Tenant_Subdomain_Here";
const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:3000/auth/redirect";
const POST_LOGOUT_REDIRECT_URI =
  process.env.POST_LOGOUT_REDIRECT_URI || "http://localhost:3000";
const GRAPH_ME_ENDPOINT =
  process.env.GRAPH_API_ENDPOINT + "v1.0/me" || "Enter_the_Graph_Endpoint_Here";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID || "Enter_the_Application_Id_Here", // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    //For external tenant
    authority:
      process.env.AUTHORITY || `https://${TENANT_SUBDOMAIN}.ciamlogin.com/`, // replace "Enter_the_Tenant_Subdomain_Here" with your tenant name
    //For workforce tenant
    //authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID
    clientSecret: process.env.CLIENT_SECRET || "Enter_the_Client_Secret_Here", // Client secret generated from the app registration in Azure portal
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: "Info",
    },
  },
};

module.exports = {
  msalConfig,
  REDIRECT_URI,
  POST_LOGOUT_REDIRECT_URI,
  TENANT_SUBDOMAIN,
  GRAPH_ME_ENDPOINT,
};
