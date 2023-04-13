import Link from "next/link";
import { FC } from "react";

const NavButton: FC<{ label: string; path: string }> = ({ label, path }) => {
  return <Link href={path}>{label}</Link>;
};

export default NavButton;
