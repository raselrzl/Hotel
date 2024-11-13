"use client";
import { BookingType } from "@/interfaces";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function AdminBookingsTable({ bookings }: { bookings: BookingType[] }) {
  const columns = [
    {
        title: "Customer",
        dataIndex: "user",
        key: "user",
        render: (text: string, record: BookingType) => record.user?.name || "N/A"
    },
    {
        title: "Hotel",
        dataIndex: "hotel",
        key: "hotel",
        render: (text: string, record: BookingType) => record.hotel?.name || "N/A",
    },
    {
        title: "Room",
        dataIndex: "room",
        key: "room",
        render: (text: string, record: BookingType) => record.room?.name || "N/A",
    },
    {
        title: "Room Number",
        dataIndex: "roomNumber",
        key: "roomNumber",
        render: (text: string, record: BookingType) => record.room?.roomNumber || "N/A",
    },
    {
        title: "Check In Date",
        dataIndex: "checkInDate",
        key: "checkInDate",
        render: (text: string, record: BookingType) =>
            record.checkInDate ? dayjs(record.checkInDate).format("MMM DD, YYYY") : "N/A",
    },
    {
        title: "Check Out Date",
        dataIndex: "checkOutDate",
        key: "checkOutDate",
        render: (text: string, record: BookingType) =>
            record.checkOutDate ? dayjs(record.checkOutDate).format("MMM DD, YYYY") : "N/A",
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (text: string, record: BookingType) => record.totalAmount || "N/A",
    },
    {
        title: "Booking Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text: string, record: BookingType) =>
            record.createdAt ? dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A") : "N/A",
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "status",
      render: (text: string, record: BookingType) => (
          <span
              className={
                  record.bookingStatus === "Cancelled" ? "text-red-600 font-bold" : "text-green-600 font-bold"
              }
          >
              {record.bookingStatus || "N/A"}
          </span>
      ),
  },
];

  return (
    <div>
      <Table dataSource={bookings} columns={columns} />
    </div>
  );
}

export default AdminBookingsTable;