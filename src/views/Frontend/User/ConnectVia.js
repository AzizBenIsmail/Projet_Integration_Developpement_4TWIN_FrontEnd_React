import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardHeader } from "reactstrap";
import React from "react";

const ConnectVia = () => {

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/connection");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardHeader className="bg-white pb-5">
      <div className="text-muted text-center mb-3">
        <small>Sign in with</small>
      </div>
      <div className="btn-wrapper text-center">
        <Button
          className="btn-neutral btn-icon ml-1"
          color="default"
          href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1011336119202-68ccv8g3nnrvrbhaibacj684alcpfmss.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow"
          onClick={handleGoogleLogin}
        >
          <span className="btn-inner--icon mr-1">
            <img
              alt="..."
              src={
                require("assetsFrontOffice/img/icons/common/google.svg")
                  .default
              }
            />
          </span>
          <span className="btn-inner--text">Google</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default ConnectVia;