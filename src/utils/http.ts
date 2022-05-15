import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

//RequestInit不具有data和token属性，所以定义一个接口来扩展属性
interface Config extends RequestInit {
    data?: object;
    token?: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * @param {endpoint} 路径
 * @param {data} 数据
 * @param {token} token
 */
export const http = async (endpoint: string,{data,token,headers,...customConfig}:Config = {}) => {
    //默认请求方式get，headers里面有token带token，有data则为application/json
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '' 
        },
        //如果其余参数有改动，则会覆盖默认参数
        ...customConfig
    }

    //通过是否是GET判断data带到header里还是body里
    if(config.method.toUpperCase() === 'GET'){
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    return window.fetch(`${apiUrl}/${endpoint}`,config).then(async response => {
        //未认证则退出登录并刷新页面
        if(response.status === 401){
            auth.logout();
            window.location.reload();
            return Promise.reject({message:'请重新登录'});
        }
        //可登录返回data，响应有误直接抛出
        const data = await response.json();
        if(response.ok){
            return data;
        } else {
            return Promise.reject(data)
        }
    })
}

//自定义hook
export const useHttp = () => {
    //拿到user并把token传入
    const { user } = useAuth();
    return (...[endpoint,config]: Parameters<typeof http>) => http(endpoint,{...config,token:user?.token});
}