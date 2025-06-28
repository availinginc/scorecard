const tenantSubdomain = "pinpointscoregolf";
const tenantId = "";

const config = {
  localApiPath: "/api",
  port: 3001,
  proxy: `https://${tenantSubdomain}.ciamlogin.com/${tenantId}`,
};
module.exports = config;
