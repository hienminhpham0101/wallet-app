import { IActivities, IParamsFilter } from "./../model/activities";
import { END_POINT } from "./../constants/endPoints/endpoints";
import axios from "axios";
const url = "http://localhost:8012";
export const getActivities = async (filters: IParamsFilter) => {
  try {
    const response = await axios.get(`${url}/${END_POINT.activities}`, {
      params: filters,
    });
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

export const updateActivity = async (
  activityId: React.Key,
  data: IActivities
) => {
  try {
    const response = await axios.put(
      `${url}/${END_POINT.activities}/${activityId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
