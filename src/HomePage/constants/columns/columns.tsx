import { IColumns } from "src/HomePage/model/columns";
export const columns: IColumns[] = [
  {
    title: "Expenditure",
    dataIndex: "expenditure",
    key: "expenditure",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    width: "12%",
    sorter: {
      compare: (a: any, b: any) => a.cost - b.cost,
      multiple: 3,
    },
  },
  {
    title: "Time",
    dataIndex: "time",
    width: "30%",
    key: "time",
  },
  {
    title: "Note",
    dataIndex: "note",
    width: "30%",
    key: "note",
  },
];
