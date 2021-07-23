import { END_POINT } from "../../constants/endPoints/endpoints";
import { url } from "../../constants/urls/urls";
import axios from "axios";
import { IAuth } from "./../models/users";
export const authorization = async (user: IAuth | undefined) => {
  try {
    const response = await axios.post(`${url}/${END_POINT.users}`, user);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const authentication = async (token: string) => {
  try {
    const response = await axios.get(`${url}/${END_POINT.users}`, {
      params: token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
