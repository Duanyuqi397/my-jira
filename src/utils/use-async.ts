import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
    data: D | null;
    error: Error | null;
    stat: "idle" | "success" | "error" | "loading";
}

const DefaultInitialState:State<null> = {
    data: null,
    error: null,
    stat: 'idle'
}

const defaultConfig = {
    throwOnError: false,
  };

const useSafeDispatch = <T>(dispatch:(...args:T[]) => void) => {
    const mountedRef = useMountedRef();
    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),[mountedRef,dispatch])
} 

//用useReducer改造
export const useAsync = <D> (initialState?: State<D>,initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state,dispatch] = useReducer((state: State<D>,action: Partial<State<D>>) => ({...state,...action}),{
        ...DefaultInitialState,
        ...initialState
    })

    const safeDispatch = useSafeDispatch(dispatch);

    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    const [retry, setRetry] = useState(() => () => {});

    const setData = useCallback((data:D) => {
        safeDispatch({
            error: null,
            stat: 'success',
            data
        })
    },[safeDispatch])

    const setError = useCallback((error: Error) => {
        safeDispatch({
            error,
            data: null,
            stat: 'error'
        })
    },[safeDispatch])

    const run = useCallback((promise: Promise<D>,runConfig?: { retry: () => Promise<D> }) => {
        if(!promise || !promise.then){
            throw new Error('请传入Promise类型数据')
        }

        setRetry(() => () => {
            if (runConfig?.retry) {
              run(runConfig?.retry(), runConfig);
            }
        });
        
        safeDispatch({stat:'loading'});

        return promise.then(data => {
            setData(data);
            return data;
        //catch会消化异常，如果不主动抛出，外界捕获不到
        }).catch(error => {
            setError(error);
            if(config.throwOnError) return Promise.reject(error);
            return error;
        })
    },[config.throwOnError,setData,setError,safeDispatch])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        //调用retry时，state刷新一遍
        retry,
        ...state
    }
}