import { useEffect,useState } from "react";

export const isFalse = (value) => value === 0 ? false : !value;

export const cleanObject = (object) => {
    const res = {...object};
    Object.keys(res).forEach(key => {
        const value = res[key];
        if(isFalse(value)){
            delete res[key];
        }
    })
    return res;
}

export const useMount = (cb) => {
    useEffect(() => {
        cb();
    },[])
}

export const useDebounce = (value,delay) => {
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