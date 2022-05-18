import { useState } from "react";
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

export const useAsync = <D> (initialState?: State<D>,initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state,setState] = useState<State<D>>({
        ...DefaultInitialState,
        ...initialState
    })

    const mountedRef = useMountedRef();

    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    const [retry, setRetry] = useState(() => () => {});

    const setData = (data:D) => {
        setState({
            error: null,
            stat: 'success',
            data
        })
    }

    const setError = (error: Error) => {
        setState({
            error,
            data: null,
            stat: 'error'
        })
    }

    const run = (promise: Promise<D>,runConfig?: { retry: () => Promise<D> }) => {
        if(!promise || !promise.then){
            throw new Error('请传入Promise类型数据')
        }

        setRetry(() => () => {
            if (runConfig?.retry) {
              run(runConfig?.retry(), runConfig);
            }
        });
        setState({...state,stat:'loading'});

        return promise.then(data => {
            if(mountedRef.current) setData(data);
            return data;
        //catch会消化异常，如果不主动抛出，外界捕获不到
        }).catch(error => {
            setError(error);
            return Promise.reject(error);
        })
    }

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