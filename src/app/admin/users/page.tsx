import { Metadata } from "next";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { AllUsers } from "@/components/users/AllUsers";

export const metadata: Metadata = {
  title: "Y-WE | Fund your events with ease",
  description: "This is a User page for ADMIN Y-WE",
};

export default async function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">
          <AllUsers />
        </div>
      </DefaultLayout>
    </>
  );
}
