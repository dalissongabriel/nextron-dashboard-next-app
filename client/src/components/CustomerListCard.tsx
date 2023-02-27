import { AppRoutes } from "@infra/config/AppRoutes";
import { ICustomer } from "@models/CustomersModels";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";

interface Prop {
  customer: ICustomer;
}

export default function CustomerListCard({ customer }: Prop) {
  return (
    <Card
      sx={{
        padding: 2,
        mb: 1,
        display: "flex",
        flexDirection: "column",
      }}
      key={customer.customerId}
      id={`customer-card-${customer.customerId}-id`}
      data-testid={`customer-card-${customer.customerId}-id`}
    >
      <Box sx={{ display: "flex", columnGap: 2 }}>
        <Box>
          <Avatar sx={{ bgcolor: grey[200] }} />
        </Box>
        <Box>
          <Typography color="darkcyan" fontWeight={500}>
            {customer.name}
            <Typography
              component="span"
              color="grey"
              fontWeight={300}
              fontSize="0.7rem"
            >
              {" "}
              &bull;{customer.customerId}
            </Typography>
          </Typography>
          <Typography color="grey" fontWeight={300} fontSize="0.7rem">
            {" "}
            {customer.email}
          </Typography>
        </Box>
      </Box>
      <Box mt={3}>
        <Button
          variant="outlined"
          LinkComponent={Link}
          color="secondary"
          startIcon={<SwitchAccountIcon />}
          href={AppRoutes.customersId(customer.customerId)}
          id={`customer-card-${customer.customerId}-btn-details-id`}
          data-testid={`customer-card-${customer.customerId}-btn-details-id`}
        >
          Details
        </Button>
      </Box>
    </Card>
  );
}
