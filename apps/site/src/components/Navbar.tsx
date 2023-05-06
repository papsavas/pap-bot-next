import { UserButton } from "@clerk/nextjs";
import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <nav className="flex h-12 w-full items-center bg-neutral-900">
      <div className="mx-16 flex w-full flex-1 flex-row items-center justify-between text-white">
        <NavButton label="Home" path="/" />
        <UserButton
          afterSignOutUrl="/login"
          showName={true}
          userProfileMode="modal"
          appearance={{
            elements: {
              userButtonOuterIdentifier: "text-lightText dark:text-darkText",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
