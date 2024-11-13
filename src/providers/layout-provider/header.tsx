"use client"
import { UserType } from "@/interfaces";
import React from "react";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./user-info";
import LinkButton from "@/components/link-button";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-between items-center px-2">
        <ProjectTitle />
        <LinkButton title="Sign In" path="/sign-in" />
      </div>
    );
  }

  return (
    <div className="lg:px-20">
      <div className="flex justify-between items-center">
        <ProjectTitle />
        <UserInfo loggedInUserData={loggedInUserData} />
      </div>
    </div>
  );
}

export default Header;