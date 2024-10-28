"use client";

import SidebarItem from "@/components/Sidebar/SidebarItem";
import React, { useState } from "react";

const Item = {
  route: "/Settings/profile",
  label: "Profile",
  icon: (
    <svg
      className="fill-current"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 1.25C9.37654 1.25 7.24989 3.37665 7.24989 6C7.24989 8.62335 9.37654 10.75 11.9999 10.75C14.6232 10.75 16.7499 8.62335 16.7499 6C16.7499 3.37665 14.6232 1.25 11.9999 1.25ZM8.74989 6C8.74989 4.20507 10.205 2.75 11.9999 2.75C13.7948 2.75 15.2499 4.20507 15.2499 6C15.2499 7.79493 13.7948 9.25 11.9999 9.25C10.205 9.25 8.74989 7.79493 8.74989 6Z"
        fill=""
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 12.25C9.68634 12.25 7.55481 12.7759 5.97534 13.6643C4.41937 14.5396 3.24989 15.8661 3.24989 17.5L3.24982 17.602C3.24869 18.7638 3.24728 20.222 4.5263 21.2635C5.15577 21.7761 6.03637 22.1406 7.2261 22.3815C8.41915 22.6229 9.97412 22.75 11.9999 22.75C14.0257 22.75 15.5806 22.6229 16.7737 22.3815C17.9634 22.1406 18.844 21.7761 19.4735 21.2635C20.7525 20.222 20.7511 18.7638 20.75 17.602L20.7499 17.5C20.7499 15.8661 19.5804 14.5396 18.0244 13.6643C16.445 12.7759 14.3134 12.25 11.9999 12.25ZM4.74989 17.5C4.74989 16.6487 5.37127 15.7251 6.71073 14.9717C8.02669 14.2315 9.89516 13.75 11.9999 13.75C14.1046 13.75 15.9731 14.2315 17.289 14.9717C18.6285 15.7251 19.2499 16.6487 19.2499 17.5C19.2499 18.8078 19.2096 19.544 18.5263 20.1004C18.1558 20.4022 17.5364 20.6967 16.4761 20.9113C15.4192 21.1252 13.9741 21.25 11.9999 21.25C10.0257 21.25 8.58063 21.1252 7.52368 20.9113C6.46341 20.6967 5.84401 20.4022 5.47348 20.1004C4.79021 19.544 4.74989 18.8078 4.74989 17.5Z"
        fill=""
      />
    </svg>
  ),
};
const Item2 = {
  route: "/Preferences",
  label: "Preferences",
  icon: (
    <svg
      className="fill-current"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 5V20"
          stroke="#4b5563"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M12 5V20"
          stroke="#4b5563"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M18 5V20"
          stroke="#4b5563"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M8.5 16C8.5 17.3807 7.38071 18.5 6 18.5C4.61929 18.5 3.5 17.3807 3.5 16C3.5 14.6193 4.61929 13.5 6 13.5C7.38071 13.5 8.5 14.6193 8.5 16Z"
          fill="#4b5563"
        ></path>
        <path
          d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z"
          fill="#4b5563"
        ></path>
        <path
          d="M20.5 16C20.5 17.3807 19.3807 18.5 18 18.5C16.6193 18.5 15.5 17.3807 15.5 16C15.5 14.6193 16.6193 13.5 18 13.5C19.3807 13.5 20.5 14.6193 20.5 16Z"
          fill="#4b5563"
        ></path>
      </g>
    </svg>
  ),
};
const Item3 = {
  route: "/Settings/credentials",
  label: "Credentials",
  icon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"
          stroke="#6b7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"
          stroke="#6b7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"
          stroke="#6b7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"
          stroke="#6b7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  ),
};
export function SettingsSidebar() {
  const [pageName, setPageName] = useState("Settings");
  return (
    <>
      <aside
        className={`left-0 top-0 
           -order-1 flex w-72.5 flex-col self-start  overflow-y-hidden rounded-3xl border-r border-stroke bg-white duration-300 ease-linear dark:border-stroke-dark dark:bg-gray-dark lg:static lg:order-none lg:translate-x-0`}
      >
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-1 px-4 lg:px-6">
            <div>
              <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6"></h3>
              <ul className="mb-6 flex flex-col gap-2">
                <SidebarItem
                  item={Item}
                  pageName={pageName}
                  setPageName={setPageName}
                />
                <SidebarItem
                  item={Item2}
                  pageName={pageName}
                  setPageName={setPageName}
                />
                <SidebarItem
                  item={Item3}
                  pageName={pageName}
                  setPageName={setPageName}
                />
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
