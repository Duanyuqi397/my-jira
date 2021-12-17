import { login } from "auth-provider";
import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  login({ username, password });
};

export const LoginSreen = () => {
  const { login, user } = useAuth();
  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>登陆成功，用户名:{user?.name}</div> : null}
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
        <button type={"submit"}>登录</button>
      </div>
    </form>
  );
};
