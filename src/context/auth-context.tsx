import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "pages/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
    username: string;
    password: string;
}

const initUser = async () => {
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

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
}|undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user,setUser] = useState<User|null>(null);
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(() => {
        //页面加载时将user设置为带token请求返回后的user 
        initUser().then(setUser)
    })

    return <AuthContext.Provider children={children} value={{user,login,register,logout}} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context;
}