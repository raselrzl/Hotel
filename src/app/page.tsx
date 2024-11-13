/* import { UserButton } from "@clerk/nextjs";
import {currentUser } from "@clerk/nextjs/server"; */

import Spinner from "@/components/spinner";
import { Button } from "antd";
import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Filters from "./_common/filters";

/* import { connectMongoDB } from "@/config/db";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";

connectMongoDB(); */

export default async function Home({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);

  console.log(searchParams);
  /* await GetCurrentUserFromMongoDB(); */

  return (
    <div>
      <div className="flex flex-col  lg:flex-row max-w-[1366px] mx-auto  sm:px-0 md:px-8 gap-4 lg:gap-12 relative">
        <div
          className="w-full lg:w-[70%] rounded-lg bg-cover bg-center h-[230px] lg:h-[400px] bg-white"
          style={{ backgroundImage: "url(/bg.jpg)" }}
        ></div>
        <div
          className="w-full lg:w-[30%] bg-white p-6 shadow-lg rounded-lg 
                    lg:absolute lg:top-[10%] lg:right-[10%]"
        >
          
          <Filters searchParams={searchParams} />
          
        </div>
      </div>
      <div className="lg:p-10 px-6">
        {/* <Filters searchParams={searchParams} /> */}
        <Suspense key={suspenseKey} fallback={<Spinner fullHeight />}>
          <RoomsData searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
