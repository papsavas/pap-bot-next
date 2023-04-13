import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <nav className="flex h-12 w-full items-center bg-neutral-900">
      <div className="mx-5 flex flex-row items-center justify-start gap-20 text-white">
        <NavButton label="Home" path="/" />
      </div>
    </nav>
  );
};

export default NavBar;
