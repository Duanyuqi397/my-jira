import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListActions, selectProjectModalOpen } from "./project-list.slice"

export const ProjectModal = () => {
    const dispatch = useDispatch();
    const projectModalOpen = useSelector(selectProjectModalOpen);
    return (
        <Drawer onClose={() => dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
            ProjectModal
        </Drawer>
    )
}