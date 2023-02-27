import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

export default function ValueTypography({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ color: grey[500] }} fontSize="1rem" fontWeight={500}>
      {children}
    </Typography>
  );
}
