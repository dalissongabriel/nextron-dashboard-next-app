import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { IPaymentMethod } from "@models/PaymentMethodsModels";
import { CreditCardTwoTone } from "@mui/icons-material";
import CreditCardDetails from "./CreditCardDetails";
import LabelTypography from "./LabelTypography";
import ValueTypography from "./ValueTypography";

interface Props {
  payment: IPaymentMethod;
}

export default function PaymentIndexCard({ payment }: Props) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(90deg, #fd4264 0%, #FB1B44 100%)",
          width: "100%",
          height: "120px",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#FB1B44",
            border: "4px solid white",
            width: "90px",
            height: "90px",
            position: "absolute",
            bottom: "-45px",
            left: "35px",
            zIndex: 1,
          }}
        >
          <CreditCardTwoTone />
        </Avatar>
      </Box>
      <CardContent sx={{ mt: 5 }}>
        <Typography component="span" color="GrayText" fontSize="1rem">
          Payment Method ID: {payment.id}
        </Typography>
        <Divider light sx={{ my: 2 }} />
        <Grid container>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Details</LabelTypography>
            <ValueTypography>
              <CreditCardDetails
                initWith={payment.cardBin}
                endsWith={payment.cardLastFour}
              />
            </ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Expiration</LabelTypography>
            <ValueTypography>
              {payment.expiryMonth}/{payment.expiryYear}
            </ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>eWallet</LabelTypography>
            <ValueTypography>{payment.eWallet}</ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Type</LabelTypography>
            <ValueTypography>{payment.methodType}</ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Name on Card</LabelTypography>
            <ValueTypography>{payment.nameOnCard}</ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Registration Date</LabelTypography>
            <ValueTypography>
              {new Date(payment.registration_time).toLocaleDateString("en-US")}
            </ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Country</LabelTypography>
            <ValueTypography>{payment.BillingAddress.country}</ValueTypography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <LabelTypography>Street 1</LabelTypography>
            <ValueTypography>{payment.BillingAddress.street1}</ValueTypography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
