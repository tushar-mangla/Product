import React from "react";
import { GoogleLogin } from "react-google-login";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "../../../../config/config.env" });

const clientId = process.env.GOOGLE_CLIENT_ID;
const buttonText = "Login with Google";

const onSuccess = async (googleData) => {
  axios({
    method: "post",
    url: "/api/auth/google",
    data: {
      googleId: googleData.googleId,
      email: googleData.email,
    },
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const onFailure = () => {};

const GoogleAuth = () => {
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={onSuccess}
      onFailure={onSuccess}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuth;
