import httpsClient from "src/shared/services/httpsClient";
import { IActivities, IParamsFilter } from "../model/activities";
import { END_POINT } from "./../../../constants/endPoints/endpoints";
import { url } from "./../../../constants/urls/urls";
export const getActivities = async (filters: IParamsFilter) => {
  try {
    const response = await httpsClient.get(`${url}/${END_POINT.activities}`, {
      params: filters,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const addActivity = async (activity: IActivities) => {
  try {
    const response = await httpsClient.post(
      `${url}/${END_POINT.activities}`,
      activity
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const removeActivity = async (activityId: React.Key[]) => {
  try {
    const response = await httpsClient.delete(
      `${url}/${END_POINT.activities}`,
      { data: activityId }
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
    const response = await httpsClient.put(
      `${url}/${END_POINT.activities}/${activityId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
