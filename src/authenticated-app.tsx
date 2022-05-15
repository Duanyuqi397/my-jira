import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";
import { Button } from "antd";

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return <div>
        <Button onClick={logout}>登出</Button>
        <ProjectList />
    </div>
}