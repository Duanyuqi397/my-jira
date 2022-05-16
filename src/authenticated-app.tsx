import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";
import { Button } from "antd";
import styled from "@emotion/styled";
import softwareLogo from "./assets/software-logo.svg";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <Button onClick={logout}>登出</Button>
            </HeaderRight>
        </Header> 
        <Main>
            <ProjectList />
        </Main> 
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`

const Header = styled(Row)`
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div``

const Main = styled.div``