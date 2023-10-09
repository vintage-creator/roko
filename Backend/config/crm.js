const axios = require("axios");

const crmToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          refresh_token: process.env.refresh_token,
          grant_type: "refresh_token",
          client_id: process.env.Client_ID,
          client_secret: process.env.Client_Secret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

const addUserToLeads = async (
  email,
  fullname,
  phone

) => {
  const accessToken = await crmToken();
  try {
    const response = await axios.post(
      "https://www.zohoapis.com/crm/v2/Leads",
      {
        data: [
          {
            "Company": "Testing",
            "Email": email,
            "First_Name": fullname,
            "Last_Name": "",
            "Phone": phone
            
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );
    console.log(response.data, "Added to ZOHO CRM");
  } catch (error) {
    console.error("Error parsing data to ZOHO CRM:", error);
    return;
  }
};

module.exports = addUserToLeads;
