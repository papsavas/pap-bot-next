import { ClerkProvider } from "@clerk/nextjs/app-beta";
import Link from "next/link";
import GuildNavBar from "./components/GuildNav/GuildNavBar";
import NavBar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText ">
          <NavBar />
          <div className="flex h-screen">
            <GuildNavBar />
            <main className="mt-8 flex flex-1 justify-center">{children}</main>
          </div>

          <Link href="/sign-in">Sign In</Link>
        </body>
      </html>
    </ClerkProvider>
  );
}
