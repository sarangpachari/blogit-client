import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

//REGISTER API
export const registerAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/api/auth/register`,
    reqBody
  );
};

//LOGIN API
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_BASE_URL}/api/auth/login`, reqBody);
};
