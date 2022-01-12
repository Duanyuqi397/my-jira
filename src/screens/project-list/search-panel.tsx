/** @jsx jsx */
import { Select } from "antd";
import { Form } from "antd";
import { jsx } from "@emotion/react";
import { Project } from "./list";
import { UserSelect } from "components/user-select";

export interface User {
  name: string;
  id: number;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface searchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
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
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName="负责人"
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
