import React from "react";
import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { useAsync } from "utils/use-async";
import { useProjects } from "../../utils/projects";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModel())}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
