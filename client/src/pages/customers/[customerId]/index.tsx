import { AddCircleRounded } from "@mui/icons-material";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import _isEmpty from "lodash/isEmpty";
import { GetServerSideProps } from "next";
import Link from "next/link";

import BackIconButton from "@components/BackIconButton";
import CustomerIndexCard from "@components/CustomerIndexCard";
import Layout from "@components/Layout";
import PaymentListCard from "@components/PaymentListCard";
import EmptyPaymentsData from "@components/PaymentsEmpty";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import {
  ICustomerDataResponse,
  IPaymentsListResponse,
} from "@infra/interfaces/ReponseInterfaces";
import { ICustomer } from "@models/CustomersModels";
import { IPaymentMethod } from "@models/PaymentMethodsModels";

interface Props {
  customer: ICustomer;
  paymentMethods: IPaymentMethod[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);
  if (!token) {
    return redirectNotAuthenticated;
  }

  const customerId = Number(ctx.params?.customerId);

  const getCustomerPromise = HttpClientHandler.get<ICustomerDataResponse>(
    AppEndpoints.api.customerId(customerId),
    ctx
  );
  const getPaymentMethodsPromise = HttpClientHandler.get<IPaymentsListResponse>(
    AppEndpoints.api.customerIdPaymentMethods(customerId),
    ctx
  );

  const [resCustomer, resPaymentMethods] = await Promise.all([
    getCustomerPromise,
    getPaymentMethodsPromise,
  ]);

  const handledCustomerData: ICustomer = {
    customerId: resCustomer.customer.customerID,
    email: resCustomer.customer.email,
    name: resCustomer.customer.name,
    telephone: resCustomer.customer.telephone,
    location: resCustomer.customer.Location,
    locationId: resCustomer.customer.location_id,
  };

  return {
    props: {
      customer: handledCustomerData,
      paymentMethods: resPaymentMethods.payments,
    },
  };
};

export default function CustomerDetailsIndex({
  customer,
  paymentMethods,
}: Props) {
  return (
    <Layout>
      <BackIconButton href={AppRoutes.customersIndex} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <CustomerIndexCard customer={customer} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Card sx={{ borderRadius: 2, padding: 2, mt: { md: 4, lg: 0 } }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" color="primary" mb={1}>
                Payment Methods
              </Typography>
              <Button
                LinkComponent={Link}
                color="primary"
                variant="contained"
                sx={{
                  color: "white",
                  display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                  mb: 2,
                }}
                startIcon={<AddCircleRounded />}
                href={AppRoutes.customersIdPaymentMethodsNew(
                  customer.customerId
                )}
              >
                Add new payment method
              </Button>
            </Box>

            <Button
              LinkComponent={Link}
              color="primary"
              variant="contained"
              sx={{ color: "white", display: { lg: "none" }, mb: 2 }}
              startIcon={<AddCircleRounded />}
              href={AppRoutes.customersIdPaymentMethodsNew(customer.customerId)}
            >
              Add new payment method
            </Button>
            {/* If don't have payments yet */}
            {_isEmpty(paymentMethods) && <EmptyPaymentsData />}

            {/* Mobile payments presentation */}
            {!_isEmpty(paymentMethods) && (
              <Box display="flex" flexDirection="column" rowGap={3}>
                {paymentMethods.map((payment) => (
                  <PaymentListCard
                    key={payment.id}
                    payment={payment}
                    hrefToDetails={AppRoutes.customersIdPaymentMethodsIndex(
                      customer.customerId,
                      payment.id
                    )}
                  />
                ))}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
