import { SignIn } from "@clerk/nextjs/app-beta";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main>
      <SignIn
        afterSignInUrl={"/"}
        appearance={{
          elements: { card: "bg-neutral-200" },
        }}
      />
    </main>
  );
}
