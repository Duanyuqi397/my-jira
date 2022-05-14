import { useState } from "react"
import { Register } from "unauthenticated-app/login";
import { Login } from "unauthenticated-app/register";

export const UnauthenticatedApp = () => {
    const [isRegister,setIsRegister] = useState(false);

    return <div>
        {
            isRegister ? <Register /> : <Login />
        }
        <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? "注册" : "登录"}</button>
    </div>
}