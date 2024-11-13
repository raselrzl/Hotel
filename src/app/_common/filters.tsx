"use client";
import { Button } from "antd";
import { FilterX, Search } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

function Filters({ searchParams }: { searchParams: any }) {
  const [checkIn, setCheckIn] = React.useState(searchParams.checkIn || "");
  const [checkOut, setCheckOut] = React.useState(searchParams.checkOut || "");
  const [type, setType] = React.useState(searchParams.type || "");
  const [name, setName] = React.useState(searchParams.name || "");
  const router = useRouter();

  const onSearch = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type, name };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/?${newSearchParams}`);
  };

  const onClear = () => {
    setCheckIn("");
    setCheckOut("");
    setType("");
    setName("");
    router.push("/");
  };

  return (
    <div>
      <h2 className="text-sm font-semibold text-center">
        {/* <img src="/logo-3.png" alt="" className="w-[200px] h-[30px] pt-[2px]" />
        Find your Dream Apartment */}
      </h2>
      <div>
        <div className="flex flex-col gap-1">
          <span className="block text-sm font-medium text-gray-500">
            Check In Date
          </span>
          <input
            placeholder="Check-in"
            className="h-10 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Check Out Date</span>
          <input
            placeholder="Check-in"
            className="h-10 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

       {/*  <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Type</span>
          <select
            className="h-10 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="delux">Delux</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
          </select>
        </div> */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">City Name</span>
          <input
            placeholder="Enter City Name"
            className="h-10 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />
        </div>

        <div className="flex gap-5 mt-4 sm:px-10 px-1">
          <Button
            icon={<FilterX size={20} />}
            className="h-10 w-full flex items-center"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            className="h-10 w-full flex items-center"
            type="primary"
            icon={<Search size={20} />}
            onClick={onSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
