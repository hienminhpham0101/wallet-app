import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Redirect } from "react-router-dom";
import { useAuth } from "src/global/contexts/usersContext";
export default function Login() {
  const { userData } = useAuth();

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
  return !userData.email ? (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  ) : (
    <Redirect to="/" />
  );
}
