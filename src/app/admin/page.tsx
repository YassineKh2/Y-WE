import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { HomePage } from "@/components/Home/HomePage";

export const metadata: Metadata = {
  title: "Y-WE | Fund your events with ease",
  description: "This is a Home page for Y-WE",
};

export default async function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">admin page</div>
      </DefaultLayout>
    </>
  );
}
