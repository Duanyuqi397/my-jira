import { useEffect,useRef,useState } from "react";

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

export const useDocumentTitle = (title: string,keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current;
    useEffect(() => {
        document.title = title;
    },[title]);
    useEffect(() => {
        return () => {
            if(!keepOnUnmount){
                document.title = oldTitle;
            }
        }
    },[keepOnUnmount,oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin;

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
 export const subset = <
 O extends { [key in string]: unknown },
 K extends keyof O
>(
 obj: O,
 keys: K[]
) => {
 const filteredEntries = Object.entries(obj).filter(([key]) =>
   keys.includes(key as K)
 );
 return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    })
    return mountedRef;
}