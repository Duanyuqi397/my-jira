import { useState } from "react";

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

export const useAsync = <D> (initialState?: State<D>) => {
    const [state,setState] = useState<State<D>>({
        ...DefaultInitialState,
        ...initialState
    })

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

    const run = (promise: Promise<D>) => {
        if(!promise || !promise.then){
            throw new Error('请传入Promise类型数据')
        }
        setState({...state,stat:'loading'});
        return promise.then(data => {
            setData(data);
            return data;
        }).catch(error => {
            setError(error);
            return error;
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
        ...state
    }
}