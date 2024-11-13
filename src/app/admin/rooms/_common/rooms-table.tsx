"use client";

import { RoomType } from "@/interfaces";
import { DeleteRoom } from "@/server-actions/rooms";

import { Table, message } from "antd";
import dayjs from "dayjs";
import { Delete, Edit, PlusSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function RoomsTable({ rooms }: { rooms: RoomType[] }) {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);
console.log(rooms)
  const onDelete = async (roomId: string) => {
    try {
      setLoading(true);
      const response = await DeleteRoom(roomId);
      if (response.success) {
        message.success(response.message);
      }
      if (!response.success) {
        message.error(response.error);
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
        render: (text: any) => text || "N/A",
    },
    {
        title: "Hotel",
        dataIndex: "hotel",
        key: "hotel",
        render: (text: any, record: RoomType) => record.hotel?.name || "N/A",
    },
    {
        title: "Room Number",
        dataIndex: "roomNumber",
        key: "roomNumber",
        render: (text: any) => text || "N/A",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (text: any) => text || "N/A",
    },
    {
        title: "Rent Per Day",
        dataIndex: "rentPerDay",
        key: "rentPerDay",
        render: (text: any) => text || "N/A",
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text: any, record: RoomType) =>
            record.createdAt ? dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A") : "N/A",
    },
    {
        title: "Action",
        key: "action",
        render: (text: any, record: RoomType) => (
            <div className="flex gap-5 items-center">
                <Trash2
                    size={18}
                    className="cursor-pointer text-red-700"
                    onClick={() => onDelete(record._id)}
                />
                <Edit
                    size={18}
                    className="cursor-pointer text-yellow-700"
                    onClick={() => router.push(`/admin/rooms/edit/${record._id}`)}
                />
            </div>
        ),
    },
];

  return (
    <div>
      <Table loading={loading} dataSource={rooms} columns={columns} />
    </div>
  );
}

export default RoomsTable;
