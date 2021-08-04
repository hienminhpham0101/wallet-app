import { ReactElement } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "src/global/contexts/usersContext";
interface IProps {
  children: ReactElement<JSX.Element>;
}
export function AuthGuard(props: IProps) {
  const { userData } = useAuth();

  if (!userData.email) {
    return <Redirect to="/login" />;
  }
  return props.children;
}

export default AuthGuard;
