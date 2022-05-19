import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd"
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopOver = (props:{ setProjectModalOpen: (isOpen: boolean) => void }) => {
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
        <ButtonNoPadding onClick={() => props.setProjectModalOpen(true)} type="link">创建项目</ButtonNoPadding>
    </ContentContainer>

    return <Popover placement="bottom" content={content} >
        <span style={{cursor:'pointer'}}>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`