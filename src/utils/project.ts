import { Project } from "pages/project-list/list";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  //第一个参数可以是tuple,只要里面数据变了就会重新请求
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));

  // const fetchProjects = useCallback(() => 
  //     client("projects", { data: cleanObject(param || {}) }),
  //   [param,client]);

  // useEffect(() => {
  //     run(fetchProjects(), {
  //         retry: fetchProjects,
  //       })
  // },[param,run,fetchProjects])

  // return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) =>
    client(`projects`, {
      data: params,
      method: "POST",
    }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  }
  )
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>([
    'project', { id }
  ], () => client(`projects/${id}`), {
    enabled: Boolean(id)
  })
}