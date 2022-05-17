import { Link } from "react-router-dom";
import { Routes,Route,Navigate } from "react-router";
import { DisplayBoard } from "pages/display-board";
import { Epic } from "pages/epic";

export const Project = () => {
    return <div>
        <h1>project</h1>
        <Link to={"display-board"}>看板</Link>
        <Link to={"epic"}>任务组</Link>
        <Routes>
            <Route path="/display-board" element={<DisplayBoard />} />
            <Route path="/epic" element={<Epic />} />
        </Routes>
        {/* 匹配不到路由，就跳转到项目看板 */}
        <Navigate to={window.location.pathname + '/display-board'} />
    </div>
}