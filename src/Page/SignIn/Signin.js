import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../Action/AuthAction";
import { Redirect, useHistory } from "react-router-dom";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { Header, Content, Footer, Sider } = Layout;
const Signin = () => {
  const [signForm, setSignForm] = useState({ emai: "", password: "" });
  let history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setSignForm(values);
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (auth.authenticate) {
      return history.push("/");
    }
  }, [auth.authenticate]);
  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="container SignInContainer" style={{ width: "100%" }}>
      <div className="container form_container">
        <div className="formBox">
          <h2 className="signIn_header">ادمین پنل سایت کافت</h2>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                {
                  required: true,
                  message: "لطفا نام کاربری حود را وارد کنید",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="پسورد"
              name="password"
              rules={[
                {
                  required: true,
                  message: "لطفا رمز خود را وارد کنید",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" size="large">
                ورود
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
