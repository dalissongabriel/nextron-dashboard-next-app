import { ReactNode } from "react";

import NavBar from "@components/NavBar";
import Container from "./Container";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <Container>{children}</Container>
    </div>
  );
}
