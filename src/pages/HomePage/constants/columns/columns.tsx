import { DatePicker, Form, Input, InputNumber } from "antd";
import { EditableCellProps } from "../../model/columns";
const disabledDate = (current: moment.Moment) => {
  return current && current.valueOf() > Date.now();
};
export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  required,
  ...restProps
}) => {
  let inputNode: JSX.Element = <></>;
  switch (inputType) {
    case "text":
      inputNode = <Input />;
      break;
    case "number":
      inputNode = (
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      );
      break;
    case "date":
      inputNode = (
        <DatePicker
          disabledDate={(current) => disabledDate(current)}
          format="MM/DD/YYYY HH:mm:ss"
          placeholder="Select date"
          showTime
        />
      );
      break;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          className="mb-0"
          rules={[
            {
              required: required ? true : false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
