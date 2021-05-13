export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  sorter?: any;
  render?: ((text: any) => JSX.Element) | undefined;
  getColumnSearchProps?: ((text: any) => JSX.Element) | undefined;
}
