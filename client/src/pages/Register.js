import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import logo from "../images/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_API_URL}/api/v1/user/register`,
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register</h3>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <div className="form-footer">
            <Link to="/login" className="login-link">
              Already a user? Login here
            </Link>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
