import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        error: null,
        stat: "success",
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        data: null,
        stat: "error",
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) throw new Error("请传入Promise类型请求");
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, state, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    isLoading: state.stat === "loading",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
