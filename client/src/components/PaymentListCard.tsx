import { CreditCardOutlined } from "@mui/icons-material";
import { Box, Button, Card, Grid } from "@mui/material";
import Link from "next/link";

import LabelTypography from "@components/LabelTypography";
import ValueTypography from "@components/ValueTypography";
import { IPaymentMethod } from "@models/PaymentMethodsModels";
import CreditCardDetails from "./CreditCardDetails";

interface Props {
  payment: IPaymentMethod;
  hrefToDetails: string;
}

export default function PaymentListCard({ payment, hrefToDetails }: Props) {
  return (
    <Card key={payment.id} sx={{ p: 2, borderTop: "10px solid #FB1B44" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <LabelTypography>Type</LabelTypography>
          <ValueTypography>{payment.methodType}</ValueTypography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <LabelTypography>Details</LabelTypography>
          <ValueTypography>
            <CreditCardDetails
              initWith={payment.cardBin}
              endsWith={payment.cardLastFour}
            />
          </ValueTypography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <LabelTypography>Expiration</LabelTypography>
          <ValueTypography>
            {payment.expiryMonth}/{payment.expiryYear}
          </ValueTypography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <LabelTypography>Registration Date</LabelTypography>
          <ValueTypography>
            {new Date(payment.registration_time).toLocaleDateString("en-US")}
          </ValueTypography>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button
          variant="outlined"
          LinkComponent={Link}
          color="secondary"
          startIcon={<CreditCardOutlined />}
          href={hrefToDetails}
          id={`payment-method-${payment.id}-btn-details-id`}
          data-testid={`payment-method-${payment.id}-btn-details-id`}
        >
          Details
        </Button>
      </Box>
    </Card>
  );
}
