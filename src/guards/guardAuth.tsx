import { ReactElement } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "src/global/contexts/usersContext";

export function AuthGuard({ props }: ReactElement<any>) {
  const { userData } = useAuth();

  if (!userData.googleId) {
    return <Redirect to="/login" />;
  }
  return props.children;
}

export default AuthGuard;
