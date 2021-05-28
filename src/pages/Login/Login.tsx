import React from "react";
import GoogleLogin from "react-google-login";

const responseGoogle = (response: any) => {
  console.log(response);
};
export default function Login() {
  return (
    <GoogleLogin
      clientId="504842184480-3k9vabpfk0rkbd01jrit5imn9vadn1m5.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
}
