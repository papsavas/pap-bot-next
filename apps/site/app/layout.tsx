import GuildNav from "./components/GuildNav";
import NavBar from "./components/Navbar";
import "./globals.css";

// export const metadata = {
//   title: "My title",
//   icon: "/papboticon.ico",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Head /> */}
      <body className="bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText ">
        <NavBar />
        <div className="flex h-screen">
          <GuildNav />
          <main className="mt-4 flex flex-1 justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
