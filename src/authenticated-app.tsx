import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg"; //用组件形式展示svg，可自己定义样式
import { ButtonNoPadding, Row } from "components/lib";
import { Route,Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Project } from "pages/project";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModal } from "pages/project-list/project-modal";
import { ProjectPopOver } from "components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen,setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen}/>
      <Main>
        <Router>
            <Routes>
                <Route path="projects" element={<ProjectList setProjectModalOpen={setProjectModalOpen} />} />
                <Route path="projects/:projectId/*" element={<Project />} />
                <Route index element={<ProjectList setProjectModalOpen={setProjectModalOpen} />}/>
            </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </Container>
  );
};

const PageHeader = (props:{ setProjectModalOpen: (isOpen: boolean) => void }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo style={{ width: "18rem", color: "rgb(38,132,255)" }} />
        </ButtonNoPadding>
        <ProjectPopOver setProjectModalOpen={props.setProjectModalOpen} />
        <span style={{ cursor: "pointer" }}>用户</span>
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
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi,{user?.name}
          </Button>
        </Dropdown>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.div``;
