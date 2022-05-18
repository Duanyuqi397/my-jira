import { Link } from "react-router-dom";
import { Routes,Route } from "react-router";
import { DisplayBoard } from "pages/display-board";
import { Epic } from "pages/epic";

export const Project = () => {
    return <div>
        <h1>project</h1>
        <Link to={"display-board"}>看板</Link>
        <Link to={"epic"}>任务组</Link>
        <Routes>
            <Route path="display-board" element={<DisplayBoard />} />
            <Route path="epic" element={<Epic />} />
            {/* 匹配不到路由，就跳转到项目看板 */}
            <Route index element={<DisplayBoard />} />
        </Routes>       
    </div>
}