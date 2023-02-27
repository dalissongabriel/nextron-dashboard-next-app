import { Edit, Email, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { AppRoutes } from "@infra/config/AppRoutes";
import { ICustomer } from "@models/CustomersModels";
import Link from "next/link";

interface Props {
  customer: ICustomer;
}

export default function CustomerIndexCard({ customer }: Props) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(90deg, #37E1C2 0%, #22C1C1 100%)",
          width: "100%",
          height: "120px",
        }}
      >
        <Avatar
          color="primary"
          sx={{
            bgcolor: "#22C1C1",
            border: "4px solid white",
            width: "90px",
            height: "90px",
            position: "absolute",
            bottom: "-45px",
            left: "35px",
            zIndex: 1,
          }}
        />
      </Box>
      <CardContent sx={{ mt: 5 }}>
        <Typography variant="h6" color="primary">
          {customer.name}
        </Typography>
        <Typography component="span" color="GrayText" fontSize="1rem">
          Customer ID: {customer.customerId}
        </Typography>
        <Divider light sx={{ my: 2 }} />

        <Typography
          color="GrayText"
          fontSize="1rem"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            columnGap: 1,
          }}
        >
          <Email /> {customer.email || "-"}
        </Typography>
        <Typography
          color="GrayText"
          fontSize="1rem"
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            columnGap: 1,
          }}
        >
          <Phone /> {customer.telephone || "-"}
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography color="GrayText" fontSize="1rem" fontWeight={500}>
              Country
            </Typography>
            <Typography
              sx={{ color: grey[400] }}
              fontSize="1rem"
              fontWeight={400}
            >
              {customer.location.country || "-"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="GrayText" fontSize="1rem" fontWeight={500}>
              Street
            </Typography>
            <Typography
              sx={{ color: grey[400] }}
              fontSize="1rem"
              fontWeight={400}
            >
              {customer.location.street1 || "-"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="GrayText" fontSize="1rem" fontWeight={500}>
              Location ID
            </Typography>
            <Typography
              sx={{ color: grey[400] }}
              fontSize="1rem"
              fontWeight={400}
            >
              {customer.location?.id || "-"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box px={2} pb={3}>
        <Button
          variant="outlined"
          LinkComponent={Link}
          color="secondary"
          startIcon={<Edit />}
          href={AppRoutes.customersIdEdit(customer.customerId)}
          id={`customer-card-${customer.customerId}-btn-edit-id`}
          data-testid={`customer-card-${customer.customerId}-btn-edit-id`}
        >
          Edit
        </Button>
      </Box>
    </Card>
  );
}
