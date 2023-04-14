import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import Link from "next/link";

export const metadata = {
  title: "PAP-bot",
  //TODO!: fix
  icon: "/papboticon.png",
  description: "PAPbot dashboard",
  viewport: {
    width: "device-width",
    initScale: 1,
  },
};

export default function Home() {
  return (
    <main>
      <h1>Next.js 13 with Clerk</h1>
      <SignedIn>
        <p>You are signed in!</p>
      </SignedIn>
      <SignedOut>
        <p>You are signed out!</p>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>
    </main>
  );
}
