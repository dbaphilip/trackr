"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQCProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
  //
  return <ReactQCProvider client={client}>{children}</ReactQCProvider>;
}
