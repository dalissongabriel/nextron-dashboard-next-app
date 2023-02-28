import { Divider, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  bottomDivider?: boolean;
}

export default function PageTitle({
  bottomDivider = false,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
      {bottomDivider && (
        <Divider
          data-testid="page-title-divider-id"
          light
          sx={{ mt: 0.5, mb: 3 }}
        />
      )}
    </>
  );
}
