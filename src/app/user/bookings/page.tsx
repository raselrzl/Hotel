import PageTitle from "@/components/page-title";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import React from "react";
import UserBookingsTable from "./_common/user-bookings-table";

async function BookingsPage() {
  let userBookings = [];
  try {
    const userResponse = await GetCurrentUserFromMongoDB();
    if (!userResponse || !userResponse.data) {
      throw new Error("User not found");
    }
    
    const userBookingsResponse = await BookingModel.find({
      user: userResponse.data._id,
    })
      .populate("room")
      .populate("hotel")
      .sort({ createdAt: -1 });
      
    userBookings = JSON.parse(JSON.stringify(userBookingsResponse));
  } catch (error: unknown) {
    console.error("Error fetching user bookings:", error instanceof Error ? error.message : "Unknown error");
    // Optionally handle error by setting some state to show a fallback UI
  }

  return (
    <div>
      <PageTitle title="My Bookings" />
      <UserBookingsTable bookings={userBookings} />
    </div>
  );
}

export default BookingsPage;
