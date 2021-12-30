/** @jsx jsx */
import { Select } from "antd";
import { Form } from "antd";
import { jsx } from "@emotion/react";

export interface User {
  name: string;
  id: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface searchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: searchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: searchPanelProps) => {
  return (
    <Form layout={"inline"} css={{ marginBottom: "2rem", ">*": "" }}>
      <Form.Item>
        <input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
