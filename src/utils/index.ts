import { useEffect,useState } from "react";

export const isFalse = (value: any):boolean => value === 0 ? false : !value;

const isVoid = (value: unknown) => value === undefined || value === null || value === '' 

//object的类型不能直接用object,因为object类型还可能是函数或者数组，所以显式写{[key: string]: unknown}，表示键值对
export const cleanObject = (object: {[key: string]: unknown}) => {
    const res = {...object};
    Object.keys(res).forEach(key => {
        const value = res[key];
        if(isVoid(value)){
            delete res[key];
        }
    })
    return res;
}

export const useMount = (cb: () => void) => {
    useEffect(() => {
        //依赖项里面加上callback会造成无限循环
        cb();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
}

export const useDebounce = (value: any,delay?: number) => {
    const [debouncedValue,setDebouncedValue] = useState(value);
    useEffect(() => {
        //每次value变化的时候设置一个定时器
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        },delay);
        return () => clearTimeout(timeout);
    },[value,delay])
    return debouncedValue;
}