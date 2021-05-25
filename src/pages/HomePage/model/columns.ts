import { IActivities } from "./activities";

export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  sorter?: any;
  render?: any;
  getColumnSearchProps?: ((text: any) => JSX.Element) | undefined;
  editable?: boolean;
  fixed?: fixed;
  type?: type;

  required?: boolean;
}
export enum ActivityKey {
  Expenditure = "expenditure",
  Cost = "cost",
  Time = "time",
  Note = "note",
}
type fixed = "left" | "right";
type type = "text" | "number" | "date";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text" | "date";
  record: IActivities;
  index: number;
  required: boolean;
  children: React.ReactNode;
}
