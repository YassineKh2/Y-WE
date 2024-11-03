import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import AddEvent from "@/components/Events/AddEvent";

export const metadata: Metadata = {
  title: "Events | Y-WE - Fund your events with ease",
  description: "This is events page for Y-WE",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Events" />
        <AddEvent />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
