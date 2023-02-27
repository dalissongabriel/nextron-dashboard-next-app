import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(90deg, #37E1C2 0%, #22C1C1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      {children}
    </Box>
  );
}
