import { ClerkProvider, auth } from "@clerk/nextjs";
import { Suspense } from "react";

import GuildNavBar, {
  GuildNavBarFallback,
} from "../components/GuildNav/GuildNavBar";
import NavBar from "../components/Navbar";
import { GuildProvider } from "../components/Providers/GuildProvider";
import "../globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className="bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
          suppressHydrationWarning={true}
        >
          <NavBar />

          <div className="flex h-screen">
            {userId ? (
              <Suspense fallback={<GuildNavBarFallback />}>
                {/* @ts-expect-error Server Component */}
                <GuildNavBar />
              </Suspense>
            ) : null}
            <main className="mt-8 flex flex-1 justify-center">
              <GuildProvider>{children}</GuildProvider>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
