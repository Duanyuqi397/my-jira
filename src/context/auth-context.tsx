import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "pages/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

export interface AuthForm {
    username: string;
    password: string;
}

export const initUser = async () => {
    //读token，如果有，则带着token去请求
    let user = null;
    const token = auth.getToken();
    if(token){
        const data = await http('me',{token});
        user = data.user;
    }
    //返回请求结果中的user
    return user;
}

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const { isLoading,isIdle,isError,error,run } = useAsync<User|null>();

    const dispatch: (...args: any[]) => Promise<User> = useDispatch();

    useMount(() => {
        //页面加载时将user设置为带token请求返回后的user 
        run(dispatch(authStore.init()));
    })

    //me接口请求失败时loading
    if(isIdle || isLoading){
        return <FullPageLoading />
    }

    if(isError){
        return <FullPageErrorFallback error={error} />
    }

    return <div>
        {children}
    </div>;
}

export const useAuth = () => {
    const dispatch: (...args: any[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
}