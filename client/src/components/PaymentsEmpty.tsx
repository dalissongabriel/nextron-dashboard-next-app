import { AddCard } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function PaymentsEmpty() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap={2}
      justifyContent="center"
      alignItems="center"
      minHeight={400}
    >
      <AddCard color="disabled" sx={{ fontSize: "4rem" }} />
      <Typography color="grey">No payment method registered .-.</Typography>
    </Box>
  );
}
