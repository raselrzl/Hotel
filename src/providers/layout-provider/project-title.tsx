import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter();
  return (
    <div
      className="p-5 text-xl font-bold cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      <img
          src="/logo-3.png"
          alt=""
          className="w-[140px] h-[25px] pt-[2px]"
      />
    </div>
  );
}

export default ProjectTitle;