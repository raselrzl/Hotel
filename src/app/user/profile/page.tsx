import PageTitle from "@/components/page-title";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import dayjs from "dayjs";
import React from "react";

async function ProfilePage() {
  let user = null;
  let bookingsCount = 0;

  try {
    // Fetch user data from MongoDB
    const response = await GetCurrentUserFromMongoDB();
    
    // Ensure response contains valid data
    if (response?.data) {
      user = response.data;

      // Count the number of bookings for the user
      bookingsCount = await BookingModel.countDocuments({ user: user._id });
    } else {
      // Handle the case where response data is undefined
      throw new Error("User data is not available.");
    }
  } catch (error: unknown) {
    // Type check for the error before accessing its properties
    if (error instanceof Error) {
      console.error("Error fetching user data:", error.message);
    } else {
      // If the error is not an instance of Error, log a generic message
      console.error("An unknown error occurred during data fetching");
    }
    // Optionally, set user to null or handle error UI
  }

  const renderUserProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col text-gray-600">
        <span className="text-xs">{label}</span>
        <span className="text-sm font-semibold"> {value}</span>
      </div>
    );
  };

  if (!user) {
    // Return a fallback UI if user data is not available
    return (
      <div>
        <PageTitle title="Profile" />
        <div className="text-center text-red-600">Failed to load user profile</div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {renderUserProperty("Name", user.name)}
        {renderUserProperty("Email", user.email)}
        {renderUserProperty("User Id", user._id)}
        {renderUserProperty("Role", user.isAdmin ? "Admin" : "User")}
        {renderUserProperty(
          "Joined At",
          dayjs(user.createdAt).format("MMM DD, YYYY hh:mm A")
        )}

        {renderUserProperty("Total Bookings", bookingsCount.toString())}
      </div>
    </div>
  );
}

export default ProfilePage;
