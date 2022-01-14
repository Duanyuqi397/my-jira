import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModel } from "screens/project-list/project-model";
import { ProjectsPopover } from "components/projects-popover";

export const AuthenticatedApp = () => {
  const [projectModelOpen, setProjectModelOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModelOpen={setProjectModelOpen} />
      <Main>
        <ProjectListScreen setProjectModelOpen={setProjectModelOpen} />
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModelOpen={setProjectModelOpen} />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModel
        onClose={() => setProjectModelOpen(false)}
        projectModelOpen={projectModelOpen}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectsPopover setProjectModelOpen={props.setProjectModelOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;

const Nav = styled.nav``;

const Aside = styled.aside``;

const Footer = styled.footer``;
