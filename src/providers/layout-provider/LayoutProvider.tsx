// components/LayoutProvider.tsx
"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import { UserType } from "@/interfaces";
import { message } from "antd";
import { usePathname } from "next/navigation";
import Spinner from "@/components/spinner";

type LayoutProviderProps = {
  loggedInUserData: UserType | null;
  children: React.ReactNode;
};

function LayoutProvider({ loggedInUserData, children }: LayoutProviderProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname.includes("/sign-in") || pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");

  const [loading, setLoading] = useState(!loggedInUserData);

  useEffect(() => {
    // Set loading state to false after receiving user data
    if (loggedInUserData) {
      setLoading(false);
    }
  }, [loggedInUserData]);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
      <div>
        <Header loggedInUserData={loggedInUserData} />
        <div className="text-center text-sm text-gray-500 py-20 px-5 lg:px-20">
          You are not authorized to access this page!!!
        </div>
      </div>
    );
  }

  if (loading) {
    return <Spinner fullHeight />;
  }

  return (
    <div>
      <Header loggedInUserData={loggedInUserData} />
      <div className="px-5 lg:px-20 mt-10">{children}</div>
    </div>
  );
}

export default LayoutProvider;
