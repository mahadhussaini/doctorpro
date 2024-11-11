import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import Layout from "../components/Layout";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Redirect to login if no user is found
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="profile-container">
        <h2 className="text-center">User Profile</h2>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {user.isAdmin ? "Admin" : user.isDoctor ? "Doctor" : "User"}
          </p>

          <Button type="primary" onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
