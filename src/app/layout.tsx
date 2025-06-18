import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "SuccessHers",
  description: "Empowering Every Step of Her Journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
