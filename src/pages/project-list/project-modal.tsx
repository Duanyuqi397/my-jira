import { Button, Drawer } from "antd"
import { useProjectModal } from "./util"

export const ProjectModal = () => {
    const {projectModalOpen,close} = useProjectModal();
    return (
        <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
            ProjectModal
        </Drawer>
    )
}