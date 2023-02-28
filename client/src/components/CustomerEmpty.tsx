import { People } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function CustomerEmpty() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap={2}
      justifyContent="center"
      alignItems="center"
      minHeight={400}
    >
      <People color="disabled" sx={{ fontSize: "4rem" }} />
      <Typography color="grey">No customers registered .-.</Typography>
    </Box>
  );
}
