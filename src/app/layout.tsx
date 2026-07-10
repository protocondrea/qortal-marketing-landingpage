import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import LayoutProvider from "./layout-provider";
import DeferredNotification from "../components/Common/Notification/DeferredNotification";

export const metadata: Metadata = {
  title: "Explore Qortal - A Web3 Platform for Everyone",
  description: "Discover Qortal, the gateway to Web3 innovation.",
  openGraph: {
    title:
      "Learn About Or Install Qortal - The Most User-Friendly Web3 Project!",
    description:
      "Discover Qortal, the gateway to Web3 innovation. Explore our easy-to-use platform for seamless access to decentralized applications.",
    images: [
      {
        url: "https://res.cloudinary.com/unnamed/image/upload/v1686728321/Q-AppsLogo_ola6of.webp",
        alt: "Q-Apps Logo",
        width: 1200,
        height: 1200
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "https://qortal.dev"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <LayoutProvider>
            <DeferredNotification />
            {children}
          </LayoutProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
