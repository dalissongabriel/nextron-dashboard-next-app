import { Card, Typography } from "@mui/material";

import GrowingNumberAnimation from "@components/GrowingNumberAnimation";
import { ReactNode } from "react";

interface Props {
  qty: number;
  label: string;
  mainColor: string;
  icon: ReactNode;
}

export default function SummaryCard({ label, qty, mainColor, icon }: Props) {
  return (
    <Card
      sx={{
        py: 2,
        px: 4,
        borderTop: `10px solid ${mainColor}`,
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
      <Typography color="primary" fontSize="1rem" sx={{ color: mainColor }}>
        {label}
      </Typography>
      <GrowingNumberAnimation color={mainColor} fontSize="2rem">
        {qty}
      </GrowingNumberAnimation>
    </Card>
  );
}
