"use client";
import { UserType } from "@/interfaces";
import { UpdateUserRole } from "@/server-actions/users";
import { Table, message } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ users }: { users: UserType[] }) {
  const [loading, setLoading] = React.useState(false);

  const onRoleChange = async (userId: string, isAdmin: boolean) => {
    try {
      setLoading(true);
      const response = await UpdateUserRole(userId, isAdmin);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: any) => text || "N/A", // Display "N/A" if name is not available
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text: any) => text || "N/A", // Display "N/A" if email is not available
    },
    {
        title: "User Id",
        dataIndex: "_id",
        key: "_id",
        render: (text: any) => text || "N/A", // Display "N/A" if User Id is not available
    },
    {
        title: "Joined At",
        dataIndex: "createdAt",
        render: (value: string) => (value ? dayjs(value).format("MMM DD, YYYY hh:mm A") : "N/A"), // Handle missing date
        key: "createdAt",
    },
    {
        title: "Role",
        dataIndex: "isAdmin",
        render: (isAdmin: boolean, user: UserType) => (
            <select
                className="border border-gray-300 py-3 px-7"
                onChange={(e) => onRoleChange(user._id, e.target.value === "admin")}
                value={isAdmin ? "admin" : "user"} // Set value to reflect the current role
            >
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        ),
    },
];

  return (
    <div>
      <Table dataSource={users} columns={columns} loading={loading} />
    </div>
  );
}

export default UsersTable;