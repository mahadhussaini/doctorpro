import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import Layout from "../components/Layout";
import axios from "axios";
import { updateUser } from "../redux/features/userSlice"; // Action to update user in Redux

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect to login if no user is found
  if (!user) {
    navigate("/login");
    return null;
  }

  // Initial form values
  const initialValues = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };

  // Form submission handler
  const handleFinish = async (values) => {
    try {
      const res = await axios.put(
        "/api/v1/user/update-profile", // Replace with your actual API endpoint
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success("Profile updated successfully!");
        dispatch(updateUser(values)); // Update user in Redux store
        navigate("/profile");
      } else {
        message.error(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating profile.");
    }
  };

  return (
    <Layout>
      <h2 className="text-center">Edit Profile</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button
            type="default"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default EditProfile;
