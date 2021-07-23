import { message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router";
import { IAuth } from "src/auth/models/users";
import getTokenFromLocalStorage from "src/auth/services/getTokenFromLocalStorage";
import setTokenToLocalStorage from "src/auth/services/setTokenToLocalStorage";
import { authorization } from "src/auth/services/users";

export default function Login() {
  const [auth, setAuth] = useState<IAuth>({
    email: "",
    googleId: "",
    imageUrl: "",
    name: "",
  });
  const [token] = useState<string | null>(() => getTokenFromLocalStorage());
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const responseGoogle = (response: any) => {
    const { email, name, googleId, imageUrl } = response.profileObj;
    const { tokenId } = response;
    if (tokenId) {
      setAuth({ email, name, googleId, imageUrl });
      setTokenToLocalStorage(tokenId);
    }
  };
  useEffect(() => {
    if (token) {
      if (auth.googleId) {
        authorization(auth)
          .then((res: any) => {
            const { status } = res;
            if (status === 200 || status === 204) {
              <Redirect push to="/" />;
            }
          })
          .catch((err) => {
            const { data } = err.response;
            message.error(data);
          });
      }
    }
    return () => {
      setAuth({
        email: "",
        googleId: "",
        imageUrl: "",
        name: "",
      });
      setIsVisible(false);
    };
  }, [auth.googleId]);
  return (
    <React.Fragment>
      <Modal
        title="Authorization"
        width="400px"
        destroyOnClose={true}
        visible={isVisible}
      >
        <GoogleLogin
          clientId="504842184480-3k9vabpfk0rkbd01jrit5imn9vadn1m5.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </Modal>
    </React.Fragment>
  );
}
