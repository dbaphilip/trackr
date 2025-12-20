"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import SearchForm from "./SearchForm";
import NavDropdown from "./NavDropdown";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <div className="mt-3 container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a
          href="/"
          className="brand d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
        >
          Tr
          <AiFillBug size={35} />
          ckr
        </a>

        <ul className="fs-3 nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "nav-link ps-3": true,

                  "link-secondary": link.href != currentPath,

                  "link-body-emphasis": link.href == currentPath,
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {status == "unauthenticated" && (
            <li>
              <Link className="link-secondary nav-link" href="/api/auth/signin">
                Login
              </Link>
            </li>
          )}
        </ul>
        <SearchForm />
        <NavDropdown />
      </div>
    </div>
  );
}
