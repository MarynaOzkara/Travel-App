import axios from "axios";

export const apiToken = "QHAyZGOZ1ZjAvNbwG282nYwvzAgA";
export const baseApiUrl =
  "https://test.api.amadeus.com/v2/shopping/flight-offers";

const clientId = "ZoshXx6XyMnudRSRpta26DRgXyLMa9vY";
const clientSecret = "z5FttCZrAC3qqIQ1";
let newApiToken = "";

const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      },
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    );
    newApiToken = response.data.access_token;
    console.log(newApiToken);
  } catch (error) {
    console.log(error);
  }
};
getNewAccessToken();
