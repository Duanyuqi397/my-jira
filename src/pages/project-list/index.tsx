import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
// import * as qs from "qs";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { ErrorBox, Row } from "components/lib";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";

export const ProjectList = () => {
    useDocumentTitle('项目列表',false);

    const [param,setParam] = useProjectsSearchParams();
    const {isLoading,error,data: list } = useProjects(useDebounce(param,200));
    const {data: users} = useUsers();
    const {open} = useProjectModal();

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={open} >创建项目</Button>
            </Row>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            <ErrorBox error={error}/>
            <List loading={isLoading} 
                users={users || []} 
                dataSource={list || []} 
                />
        </Container>
    )
}

// ProjectList.whyDidYouRender = true;

const Container = styled.div`
    padding: 3.2rem;
`