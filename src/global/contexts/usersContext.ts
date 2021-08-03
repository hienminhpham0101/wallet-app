import { createContext, useContext } from "react";
import { IAuth } from "src/auth/models/users";
export const initialCurrentUser = {
  email: "",
  googleId: "",
  imageUrl: "",
  name: "",
};

export const UserContext = createContext<{
  userData: IAuth;
  setUserData: React.Dispatch<React.SetStateAction<IAuth>>;
}>({
  userData: initialCurrentUser,
  setUserData() {},
});
export const UserContextProvider = UserContext.Provider;
export const useAuth = () => useContext(UserContext);
