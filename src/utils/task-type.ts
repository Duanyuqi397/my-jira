import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { TaskType } from "pages/display-board/task-type";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () =>
    client("taskTypes")
  );
};