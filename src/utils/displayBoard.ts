import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { DisplayBoard } from "types/DisplayBoard";

export const useDisplayBoards = (param?: Partial<DisplayBoard>) => {
  const client = useHttp();

  return useQuery<DisplayBoard[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};