"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
  const currentPath = usePathname();

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
          {/* Brand */}
          Tr
          <AiFillBug size={35} />
          ckr
        </a>
        <ul className="fs-2 nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
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
        </ul>
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            className="fs-2 shadow-primary form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <div className="dropdown text-end">
          <a
            href="#"
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width={48}
              height={48}
              className="rounded-circle"
            />
          </a>
          <ul className="dropdown-menu text-small">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
