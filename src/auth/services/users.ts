import { END_POINT } from "../../constants/endPoints/endpoints";
import { url } from "../../constants/urls/urls";
import axios from "axios";
import { IUser } from "./../models/users";
export const addUser = async (user: IUser, googleId: string) => {
  try {
    const response = await axios.post(`${url}/${END_POINT.users}`, {
      params: { user, googleId },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
