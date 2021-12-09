import React, { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response: Response) => {
      if (response.ok) {
      }
    });
  };

  event.preventDefault();
  const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  login({ username, password });
};

export const LoginSreen = () => {
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
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
