import { ArrowBackOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

interface Props {
  href: string;
}

export default function BackIconButton({ href }: Props) {
  return (
    <IconButton color="secondary" LinkComponent={Link} href={href}>
      <ArrowBackOutlined />
    </IconButton>
  );
}
