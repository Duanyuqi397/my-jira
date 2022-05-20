import React from "react";
import { User } from "./search-panel";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";

export interface Project {
  id: number;
  personId: number;
  name: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
    //TableProps<Project>包含了本来在这里的list
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const {startEditing} = useProjectModal();
  const {mutate} = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });//柯里化
  const editProject = (id: number) => () => startEditing(id);
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value,project){
            return <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
          }
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "未知"}
              </span>
            );
          },
        },
        {
          title:'操作',
          render(value,project){
            return <Dropdown overlay={<Menu>
              <Menu.Item key='edit'>
                <ButtonNoPadding type="link" onClick={editProject(project.id)}>编辑</ButtonNoPadding>
              </Menu.Item>
              <Menu.Item key='delete'>
                <ButtonNoPadding type="link" >删除</ButtonNoPadding>
              </Menu.Item>
            </Menu>}>
              <ButtonNoPadding type="link">...</ButtonNoPadding>
            </Dropdown>
          }
        }
      ]}
      {...props}
    />
  );
};
