import { UserType } from "@/interfaces";
import { Button, Drawer } from "antd";
import {
  BedDouble,
  GitGraph,
  Home,
  Hotel,
  List,
  User,
  User2,
} from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function Sidebar({
  showSidebar,
  setShowSidebar,
  loggedInUserData,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {
  const iconSize = 18;
  const router = useRouter();
  const pathname = usePathname();

  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    router.push("/");
    window.location.reload();
    setShowSidebar(false);
 
  };

  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "My Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];
  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
      isActive: pathname.includes("/admin/rooms"),
    },
    {
      name: "Users",
      icon: <User2 size={iconSize} />,
      onClick: () => router.push("/admin/users"),
      isActive: pathname.includes("/admin/users"),
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const menuItemsToShow: any[] = loggedInUserData.isAdmin
    ? adminMenuItems
    : userMenuItems;

  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-4">
        {menuItemsToShow.map((item, index) => (
          <div
            className={`flex gap-2 items-center text-gray-700 cursor-pointer px-7 py-3 ${
              item.isActive ? "bg-gray-800 text-white" : ""
            }`}
            key={index}
            onClick={() => {
              item.onClick();
              setShowSidebar(false);
            }}
          >
            {item.icon}
            <span className="mt-[2px]">{item.name}</span>
          </div>
        ))}

        
          <span
            className="text-center cursor-pointe text-red-700 text-base cursor-pointer font-bold"
            onClick={onLogout}
          >
            Sign Out
          </span>
      </div>
    </Drawer>
  );
}

export default Sidebar;
