import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";


export const Login = () => {
  const { register } = useAuth();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
