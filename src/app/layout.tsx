"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import SessionWrapper from "@/components/SessionWrapper";

import { useSetLoading } from "@/stores/config-store";
import { NextUIProvider } from "@nextui-org/system";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loading = useSetLoading((state) => state.loading);

  return (
    <SessionWrapper>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <NextUIProvider>{loading ? <Loader /> : children}</NextUIProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
