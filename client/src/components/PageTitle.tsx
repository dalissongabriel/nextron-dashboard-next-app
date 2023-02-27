import { Divider, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  bottomDivider: boolean;
}

export default function PageTitle({
  bottomDivider,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
      {bottomDivider && <Divider light sx={{ mt: 0.5, mb: 3 }} />}
    </>
  );
}
