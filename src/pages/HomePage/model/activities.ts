export interface IActivities {
  id?: number | string;
  key: any;
  expenditure: string;
  time: any;
  cost: number;
}
export interface IParamsFilter {
  page: number;
  pageSize?: number;
  startDate?: Date | null;
  endDate?: Date | null;
}
export const DefaultSearch = {
  page: 1,
  pageSize: 10,
  startDate: null,
  endDate: null,
};
