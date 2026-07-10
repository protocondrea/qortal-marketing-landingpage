"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Notification = dynamic(() => import("./Notification"), {
  ssr: false
});

const DeferredNotification = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <Notification />;
};

export default DeferredNotification;
