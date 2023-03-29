"use client";

import HomeButton from "./HomeButton";

const NavBar = () => {
  return (
    <nav className="flex h-12 w-full items-center  bg-neutral-800  dark:bg-neutral-900">
      <div className="mx-5 flex flex-row items-center justify-start gap-20 text-white">
        <HomeButton />
      </div>
    </nav>
  );
};

export default NavBar;
