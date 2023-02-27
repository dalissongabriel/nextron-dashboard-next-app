import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <Box padding="1rem 1rem" sx={{ marginTop: 8 }}>
      {children}
    </Box>
  );
}
