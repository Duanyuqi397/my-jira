import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useDisplayBoards } from "utils/displayBoard";
import { useTasks } from "utils/task";
import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

// export const useDisplayBoardsSearchParams = () => ({projectId: useProjectIdInUrl()});

// export const useDisplayBoardsQueryKey = () => ['kanbans',useDisplayBoardsSearchParams()];

export const useTasksSearchParams = () => {
    const [param,setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl();
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
    }),[projectId,param])
};

// export const useTasksQueryKey = () => ['tasks',useTasksSearchParams()];

export const useDisplayBoardsInProject = () =>
  useDisplayBoards({ projectId: useProjectIdInUrl() });

export const useTasksInProject = () =>
  useTasks({ projectId: useProjectIdInUrl() });