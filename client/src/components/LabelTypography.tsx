import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

export default function LabelTypography({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ color: grey[700] }} fontSize="1rem" fontWeight={500}>
      {children}
    </Typography>
  );
}
