const tenantSubdomain = "Enter_the_Tenant_Subdomain_Here";
const tenantId = "Enter_the_Tenant_Id_Here";

const config = {
  localApiPath: "/api",
  port: 3001,
  proxy: `https://${tenantSubdomain}.ciamlogin.com/${tenantId}`,
};
module.exports = config;
