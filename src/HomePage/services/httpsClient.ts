import { IActivities } from "./../model/activities";
import { END_POINT } from "./../constants/endPoints/endpoints";
import axios from "axios";
const url = "http://localhost:8012";
export const getActivities = async () => {
  try {
    const response = await axios.get(`${url}/${END_POINT.activities}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const addActivity = async (activity: IActivities) => {
  try {
    const response = await axios.post(
      `${url}/${END_POINT.activities}`,
      activity
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const removeActivity = async (activityId: React.Key) => {
  try {
    const response = await axios.delete(
      `${url}/${END_POINT.activities}/${activityId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
