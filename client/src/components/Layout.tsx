import { Button } from "@mui/material";
import { ReactNode } from "react";

import NavBar from "@components/NavBar";
import { useAuthContext } from "@contexts/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { handleLogout } = useAuthContext();

  return (
    <div>
      <NavBar />
      <Button onClick={handleLogout}>Logout</Button>
      <hr />
      {children}
    </div>
  );
}
