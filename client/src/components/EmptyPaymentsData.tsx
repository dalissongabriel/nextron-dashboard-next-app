import { AddCard } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function EmptyPaymentsData() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap={2}
      justifyContent="center"
      alignItems="center"
    >
      <AddCard color="disabled" sx={{ fontSize: "4rem" }} />
      <Typography color="grey">No payment method registered .-.</Typography>
    </Box>
  );
}
