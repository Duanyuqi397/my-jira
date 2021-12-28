import React, { useState } from "react";
import { LoginSreen } from "./login";
import { RegisterScreen } from "./register";
import { Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginSreen />}
        <button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </button>
      </Card>
    </div>
  );
};
