import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./style.css";
function Login(props) {
  return (
    <div className="login">
      <div className="login-left">
        <div className="login-left-img">
          <img
            src="https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div className="login-right">
        <h3>Login to continue</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            className="login-email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="login-password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <div className="login-checkbox">
          <input type="checkbox" id="checked" />
          <label htmlFor="check">Remember me</label>
        </div>
        <div className="login-button">
          <button>Login</button>
        </div>
        <span>or sign up using</span>
        <div className="login-icon">
          <a className="login-facebook" href>
            <i className="fab fa-facebook" />
          </a>
          <a className="login-twitter" href>
            <i className="fab fa-twitter-square" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
