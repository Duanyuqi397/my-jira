import { User } from "types/User";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
    const { run,...result} = useAsync<User[]>();
    const client = useHttp();

    useEffect(() => {
        run(client('users',{data: cleanObject(param || {})}))
    },[param, run, client])

    return result;
}