import { useAuth } from "context/auth-context";
import React from "react";
import { Input,Form } from "antd";
import { LongButton } from "unauthenticated-app";

export const Register = ({onError}:{onError:(error:Error) => void}) => {
  const { register } = useAuth();

  const handleSubmit = async ({cpassword,...values}:{username: string,password: string,cpassword: string}) => {
    if(cpassword !== values.password){
      onError(new Error("请确认两次输入的密码一致"));
      return;
    }
    try {
      await register(values);
    } catch (e) {
      //@ts-ignore
      onError(e)
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='username' rules={[{required: true,message:'请输入用户名'}]}>
        <Input placeholder="用户名" type="text" />
      </Form.Item>
      <Form.Item name='password' rules={[{required: true,message:'请输入密码'}]}>
        <Input placeholder="密码" type="password" />
      </Form.Item>
      <Form.Item name='cpassword' rules={[{required: true,message:'请确认密码'}]}>
        <Input placeholder="确认密码" type="cpassword" />
      </Form.Item>
      <Form.Item>
          <LongButton htmlType="submit" type="primary">注册</LongButton>
      </Form.Item>
    </Form>
  );
};
