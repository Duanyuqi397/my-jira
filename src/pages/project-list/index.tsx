import React,{useState} from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
// import * as qs from "qs";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectList = () => {
    useDocumentTitle('项目列表',false);

    const [param,setParam] = useUrlQueryParam(['name','personId']);
    const {isLoading,error,data: list } = useProjects(useDebounce(param,200));
    const {data: users} = useUsers();

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List loading={isLoading} users={users || []} dataSource={list || []} />
        </Container>
    )
}

ProjectList.whyDidYouRender = true;

const Container = styled.div`
    padding: 3.2rem;
`