"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavDropdown() {
  const { status, data: session } = useSession();

  return (
    <div className="fs-2 dropdown text-end">
      {status == "authenticated" && (
        <a
          href="#"
          className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={session.user!.image!}
            alt="mdo"
            width={48}
            height={48}
            className="shadow-secondary rounded-circle"
          />
        </a>
      )}
      <ul className="fs-2 dropdown-menu text-small">
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
        {status == "authenticated" && (
          <li>
            <Link className="dropdown-item" href="/api/auth/signout">
              Logout <span className="fs-5">{session.user!.email}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
