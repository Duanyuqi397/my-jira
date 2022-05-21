import React from "react";
import { useDocumentTitle } from "utils";
import { useDisplayBoardsInProject, useProjectInUrl } from "pages/display-board/util";
import { DisplayBoardColumn } from "pages/display-board/display-board-column";
import styled from "@emotion/styled";
import { useDisplayBoards } from "utils/displayBoard";

export const DisplayBoard = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: displayBoards } = useDisplayBoards();
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {displayBoards?.map((displayBoard) => (
          <DisplayBoardColumn displayBoard={displayBoard} key={displayBoard.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;