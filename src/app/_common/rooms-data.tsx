import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import Link from "next/link";
import React from "react";
import { GetAvailableRooms } from "@/server-actions/bookings";

async function RoomsData({ searchParams }: { searchParams: any }) {
  const response = await GetAvailableRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
    name:searchParams.name ||"",
  });

  const rooms: RoomType[] = response.data;

  if (rooms.length === 0) {
    return <div>No rooms found</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {rooms.map((room: RoomType) => (
        <Link
          href={`book-room/${room._id}`}
          key={room._id}
          className="no-underline text-black"
        >
          <div className="flex flex-col gap-2 border border-gray-200 border-solid room-card">
            <img src={room.media[3]} className="w-full h-54 object-cover" />
            <div className="px-3 py-2 flex flex-col text-sm gap-2">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold">{room.name}</span>
                </div>
                <span className="font-bold">
                  ${room.rentPerDay} / Night ({room.type})
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs">
                <div>
                  {" "}
                  <img
                    src="/pin.png"
                    alt="address-icon"
                    className="w-[12px] h-[12px]"
                  />{" "}
                  <span>
                    {/* {room.hotel.name} -  */}
                    {room.hotel.address}
                  </span>
                </div>
                <div className="gap-1">
                  <span className="bg-gray-200 rounded mx-1 pt-[2px]">
                    <img
                      src="/bed.png"
                      alt=""
                      className="w-[12px] h-[12px] pt-[2px]"
                    />
                    {room.bedrooms}
                  </span>
                  <span className="bg-gray-200 rounded mx-1 pt-[2px]">
                    <img src="/bath.png" alt="" className="w-[12px] h-[12px]" />{" "}
                    {room.bedrooms}
                  </span>
                </div>
              </div>
              <span className="text-gray-500 text-xs mt-1">
                {room.amenities}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RoomsData;