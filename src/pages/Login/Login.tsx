import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  setTokenToLocalStorage,
  token,
} from "src/auth/services/localStorageService";
import { useAuth } from "src/global/contexts/usersContext";
export default function Login() {
  const { setUserData } = useAuth();

  return !token ? <div className="login"></div> : <Redirect to="/" />;
}
