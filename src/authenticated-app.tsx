import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg"; //用组件形式展示svg，可自己定义样式
import { Row } from "components/lib";
import { Navigate,Route,Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Project } from "pages/project";
import { resetRoute } from "utils";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
            <Routes>
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:projectId/*" element={<Project />} />
                {/* <Navigate to={'/projects'}/> */}
            </Routes>
            <Navigate to={'/projects'}/>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo style={{ width: "18rem", color: "rgb(38,132,255)" }} />
        </Button>
        <h2 style={{ cursor: "pointer" }}>项目</h2>
        <h2 style={{ cursor: "pointer" }}>用户</h2>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
  );
};

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
