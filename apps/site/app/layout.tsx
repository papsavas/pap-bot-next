import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs/app-beta";
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
            <SignedIn>
              <GuildNavBar />
              <main className="mt-8 flex flex-1 justify-center">
                {children}
              </main>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-1 items-center justify-center">
                <SignIn
                  afterSignInUrl={"/"}
                  appearance={{
                    elements: { card: "bg-neutral-200" },
                  }}
                />
              </div>
            </SignedOut>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
