import PageTitle from "@/components/page-title";
import React from "react";
import HotelForm from "../_common/hotel-form";

function AddHotelPage() {
  return (
    <div className="px-10">
      <PageTitle title="Add Hotel" />
      <HotelForm type="add" />
    </div>
  );
}

export default AddHotelPage;