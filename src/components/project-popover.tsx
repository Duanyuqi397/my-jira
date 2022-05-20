import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd"
import { useProjectModal } from "pages/project-list/util";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopOver = () => {
    const {open} = useProjectModal();
    const {data: projects,isLoading} = useProjects();
    const pinnedProjects = projects?.filter(project => project.pin);
    const content = <ContentContainer>
        <Typography.Text type="secondary">收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(pinnedProject => <List.Item>
                    <List.Item.Meta title={pinnedProject.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type="link" onClick={open}>创建项目</ButtonNoPadding>
    </ContentContainer>

    return <Popover placement="bottom" content={content} >
        <span style={{cursor:'pointer'}}>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`