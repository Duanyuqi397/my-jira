import { useEffect,useState } from "react";

export const isFalse = (value: any):boolean => value === 0 ? false : !value;

export const cleanObject = (object: Object) => {
    const res = {...object};
    Object.keys(res).forEach(key => {
        //@ts-ignore
        const value = res[key];
        if(isFalse(value)){
            //@ts-ignore
            delete res[key];
        }
    })
    return res;
}

export const useMount = (cb: () => void) => {
    useEffect(() => {
        cb();
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