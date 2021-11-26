import React from "react";
import { GoogleLogin } from "react-google-login";
import dotenv from "dotenv";

dotenv.config({ path: "../../../../config/config.env" });

const clientId = process.env.GOOGLE_CLIENT_ID;
const buttonText = "Login with Google";

const onSuccess = async (googleData) => {
  const res = await fetch("/api/auth/google/callback", {
    method: "POST",
    body: JSON.stringify({
      token: googleData.tokenId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
};

const onFailure = () => {};

const GoogleAuth = () => {
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

export default GoogleAuth;
