import axios from "axios";

export const apiToken = "gFwPBBhic15cMY05XaYYgOEsbonj";
export const baseApiUrl =
  "https://test.api.amadeus.com/v2/shopping/flight-offers";

const clientId = "FmplkrKaxPxI9SPd04bmVRTfQAAjqYeU";
const clientSecret = "oJlxqfPh4lz5KLEz";
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
