import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata = {
  title: "KeenKeeper - Stay Connected",
  description: "Browse, tend, and nurture the relationships that matter most.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased min-h-screen bg-[#f8fafc]">
        <AppProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster position="bottom-right" />
        </AppProvider>
      </body>
    </html>
  );
}
