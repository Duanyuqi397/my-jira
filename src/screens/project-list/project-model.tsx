import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModel = (props: {
  projectModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer width={"100%"} visible={props.projectModelOpen}>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
