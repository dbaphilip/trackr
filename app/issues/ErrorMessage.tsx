import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  //
  if (!children) return null;

  return <div className="fs-3 text-danger form-text">{children}</div>;
}
