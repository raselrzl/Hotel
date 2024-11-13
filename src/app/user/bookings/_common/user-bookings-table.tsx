"use client";
import { BookingType } from "@/interfaces";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import CancelBookingModal from "./cancel-booking-modal";

function UserBookingsTable({ bookings }: { bookings: BookingType[] }) {
  const [showCancelBookingModal, setShowCancelBookingModal] =
    React.useState(false);
  const [selectedBooking, setSelectedBooking] =
    React.useState<BookingType | null>(null);

  const onCancel = async (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowCancelBookingModal(true);
  };
  const columns = [
    {
        title: "Hotel",
        dataIndex: "hotel",
        key: "hotel",
        render: (text: any, record: BookingType) => record.hotel?.name || "N/A", // Display "N/A" if hotel name is missing
    },
    {
        title: "Room",
        dataIndex: "room",
        key: "room",
        render: (text: any, record: BookingType) => record.room?.name || "N/A", // Display "N/A" if room name is missing
    },
    {
        title: "Room Number",
        dataIndex: "roomNumber",
        key: "roomNumber",
        render: (text: any, record: BookingType) => record.room?.roomNumber || "N/A", // Display "N/A" if room number is missing
    },
    {
        title: "Check In Date",
        dataIndex: "checkInDate",
        key: "checkInDate",
        render: (text: any, record: BookingType) =>
            record.checkInDate ? dayjs(record.checkInDate).format("MMM DD, YYYY") : "N/A", // Display "N/A" if check-in date is missing
    },
    {
        title: "Check Out Date",
        dataIndex: "checkOutDate",
        key: "checkOutDate",
        render: (text: any, record: BookingType) =>
            record.checkOutDate ? dayjs(record.checkOutDate).format("MMM DD, YYYY") : "N/A", // Display "N/A" if check-out date is missing
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (text: any, record: BookingType) => record.totalAmount || "N/A", // Display "N/A" if total amount is missing
    },
    {
        title: "Booking Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text: any, record: BookingType) =>
            record.createdAt ? dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A") : "N/A", // Display "N/A" if booking date is missing
    },
    {
        title: "Status",
        dataIndex: "bookingStatus",
        key: "status",
        render: (text: any) => (
            <span className="font-bold" style={{ color: text === "Cancelled" ? "red" : "green" }}>
                {text || "N/A"} {/* Display "N/A" if status is missing */}
            </span>
        ),
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text: any, record: BookingType) =>
            record.bookingStatus === "Booked" ? (
                <span
                    className="text-red-500 cursor-pointer text-sm font-bold"
                    onClick={() => onCancel(record)}
                >
                    Cancel
                </span>
            ) : (
                "N/A" // Display "N/A" if the booking status is not "Booked"
            ),
    },
];

  return (
    <div>
      <Table dataSource={bookings} columns={columns} />

     {showCancelBookingModal && selectedBooking && (
        <CancelBookingModal
          showCancelBookingModal={showCancelBookingModal}
          setShowCancelBookingModal={setShowCancelBookingModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}

export default UserBookingsTable;
