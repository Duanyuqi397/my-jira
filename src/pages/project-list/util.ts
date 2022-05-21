import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
      useMemo(
        () => ({ ...param, personId: Number(param.personId) || undefined }),
        [param]
      ),
      setParam,
    ] as const;
  };

export const useProjectModal = () => {
  const [{projectCreate},setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ]);

  const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ]);

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject,isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({projectCreate: true});
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" })
  // const close = () => setUrlParams({  })
  const startEditing = (id: number) => {
    setEditingProjectId({editingProjectId: id})
  };

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEditing,
    editingProject,
    isLoading
  }
}