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
}
type fixed = "left" | "right";
