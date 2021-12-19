import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" id={"username"}>
          用户名
        </label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="password" id={"password"}>
          密码
        </label>
        <input type="password" />
        <button type={"submit"}>注册</button>
      </div>
    </form>
  );
};
