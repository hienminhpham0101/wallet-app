import GoogleLogin from "react-google-login";
import getTokenFromLocalStorage from "src/auth/services/getTokenFromLocalStorage";
import setTokenToLocalStorage from "src/auth/services/setTokenToLocalStorage";
import { addUser } from "src/auth/services/users";

const responseGoogle = (response: any) => {
  const { email, name, googleId, imageUrl } = response.profileObj;
  const { tokenId } = response;
  setTokenToLocalStorage(tokenId);
  addUser({ email, name, googleId, imageUrl }, googleId);
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
