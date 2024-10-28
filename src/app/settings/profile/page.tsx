import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SettingBoxes from "@/components/Settings/profile";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Y-WE - Fund your events with ease",
  description: "This is profile page for Y-WE",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Settings" />
        <SettingBoxes />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
