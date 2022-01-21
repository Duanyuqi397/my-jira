import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModelOpen,
} from "./project-list.slice";

export const ProjectModel = () => {
  const dispatch = useDispatch();
  const projectModelOpen = useSelector(selectProjectModelOpen);
  return (
    <Drawer
      width={"100%"}
      visible={projectModelOpen}
      onClose={() => projectListActions.closeProjectModel()}
    >
      <Button onClick={dispatch(() => projectListActions.closeProjectModel())}>
        关闭
      </Button>
    </Drawer>
  );
};
