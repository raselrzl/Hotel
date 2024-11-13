// hotels/page.tsx
import HotelModel from "@/models/hotel-model";
import React from "react";
import { Await } from "react-router-dom";
import { Suspense } from "react";
import RoomsData from "../_common/rooms-data";
import Filters from "../_common/filters";
import { datas } from "./components/dummayData";
import Map from "./components/Map";

interface DataItem {
  id: number; 
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
}

async function HotelsPage({ searchParams }: { searchParams: any }) {
  const response = await HotelModel.find().sort({ createdAt: -1 });
  const hotels = JSON.parse(JSON.stringify(response));
  const suspenseKey = JSON.stringify(searchParams);

  return (
    <div className="flex flex-col lg:flex-row lg:max-w-[1024px] mx-auto h-screen">
      <div className="lg:w-[65%] w-full lg:pr-4 overflow-y-scroll h-full">
        <div className="max-w-full overflow-x-scroll h-screen">
          <div className="w-full max-w-[400px] bg-white p-6 shadow-2xl rounded-lg m-1">
            <Filters searchParams={searchParams} />
          </div>
          <RoomsData searchParams={searchParams} />
        </div>
      </div>
      <div className="w-full lg:w-[35%] lg:h-screen lg:sticky lg:top-0 lg:pl-4 bg-gray-200 order-last lg:order-none hidden lg:block">
        {/* Map is hidden on mobile, only visible on large screens */}
        <Map datas={hotels} />
      </div>
    </div>
  );
}

export default HotelsPage;
