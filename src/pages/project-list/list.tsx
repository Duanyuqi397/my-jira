import React from "react"
import { User } from "./search-panel";
import { Table } from "antd";

interface Project {
    id: string;
    personId: string;
    name: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[];
    users: User[];
}

export const List = ({users,list}: ListProps) => {
    return <Table pagination={false} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a,b) => a.name.localeCompare(b.name)
    },{
        title: '负责人',
        render(value,project){
            return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
        }
    }]} dataSource={list}>
    </Table>
}