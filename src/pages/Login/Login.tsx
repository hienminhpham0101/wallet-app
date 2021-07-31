import React, { useContext, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { UserContext } from "src/global/contexts/usersContext";

export default function Login() {
  const userData = useContext(UserContext);
  const responseGoogle = (response: any) => {
    if (response) {
      const { email, name, googleId, imageUrl } = response.profileObj;
      userData.setUserData({
        email,
        name,
        googleId,
        imageUrl,
      });
    }
  };
  useEffect(() => {
    fetch("https://5fd8e8c17e05f000170d32a3.mockapi.io/Users")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [userData]);
  return (
    <React.Fragment>
      <GoogleLogin
        clientId="504842184480-3k9vabpfk0rkbd01jrit5imn9vadn1m5.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </React.Fragment>
  );
}
