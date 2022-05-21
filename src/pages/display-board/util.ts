import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useDisplayBoards } from "utils/displayBoard";
import { useTasks } from "utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

// export const useDisplayBoardsSearchParams = () => ({projectId: useProjectIdInUrl()});

// export const useDisplayBoardsQueryKey = () => ['kanbans',useDisplayBoardsSearchParams()];

// export const useTasksSearchParams = () => ({projectId: useProjectIdInUrl()});

// export const useTasksQueryKey = () => ['tasks',useTasksSearchParams()];

export const useDisplayBoardsInProject = () =>
  useDisplayBoards({ projectId: useProjectIdInUrl() });

export const useTasksInProject = () =>
  useTasks({ projectId: useProjectIdInUrl() });