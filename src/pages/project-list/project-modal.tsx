import { Button, Drawer } from "antd"

export const ProjectModal = (props:{ projectModalOpen: boolean,onClose: () => void }) => {
    return (
        <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}>
            ProjectModal
        </Drawer>
    )
}