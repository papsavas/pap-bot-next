import GuildNavBar from "./components/GuildNavBar/GuildNavBar";
import NavBar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText ">
        <NavBar />
        <div className="flex h-screen">
          <GuildNavBar />
          <main className="mt-8 flex flex-1 justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
