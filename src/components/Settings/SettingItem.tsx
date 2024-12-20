import React, { useState } from "react";
import Link from "next/link";

const SettingItem = ({ item, active }: any) => {
  return (
    <>
      <li>
        <Link
          href={item.route}
          className={`${active ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white" : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"} group relative flex items-center gap-3 rounded-[7px] px-3.5 py-3 font-medium duration-300 ease-in-out`}
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    </>
  );
};

export default SettingItem;
