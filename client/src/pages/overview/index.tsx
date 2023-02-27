import {
  ArrowRightAlt,
  CreditCardTwoTone,
  PeopleOutlineRounded,
} from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import _isEmpty from "lodash/isEmpty";
import { GetServerSideProps } from "next";
import Link from "next/link";

import EmptyPaymentsData from "@components/EmptyPaymentsData";
import Layout from "@components/Layout";
import PageTitle from "@components/PageTitle";
import PaymentListCard from "@components/PaymentListCard";
import SummaryCard from "@components/SummaryCard";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import {
  ICustomerListResponse,
  IPaymentMethodResponse,
} from "@infra/interfaces/ReponseInterfaces";
import { IPaymentMethod } from "@models/PaymentMethodsModels";

interface Props {
  summary: {
    customersQty: number;
    paymentsQty: number;
  };
  payments: IPaymentMethod[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);

  if (!token) {
    return redirectNotAuthenticated;
  }

  const allCustomersPromise =
    await HttpClientHandler.get<ICustomerListResponse>(
      AppEndpoints.api.customers,
      ctx
    );

  const allPaymentsPromise =
    await HttpClientHandler.get<IPaymentMethodResponse>(
      AppEndpoints.api.paymentMethods,
      ctx
    );

  const [customersRes, paymentsRes] = await Promise.all([
    allCustomersPromise,
    allPaymentsPromise,
  ]);

  return {
    props: {
      summary: {
        customersQty: customersRes.customers.length,
        paymentsQty: paymentsRes.payments.length,
      },
      payments: paymentsRes.payments,
    },
  };
};

export default function OverviewIndex({ payments, summary }: Props) {
  return (
    <Layout>
      <Box
        sx={{ display: "flex", flexDirection: "column", padding: "1rem 1rem" }}
      >
        <Paper sx={{ p: 2 }}>
          <PageTitle bottomDivider>Overview</PageTitle>
          <Button
            LinkComponent={Link}
            href={AppRoutes.customersIndex}
            color="primary"
            variant="contained"
            id="overview-btn-customers-id"
            data-testid="overview-btn-customers-id"
            sx={{
              color: "white",
              display: { md: "none" },
            }}
            startIcon={<ArrowRightAlt />}
          >
            See customers
          </Button>
          <Box
            display="flex"
            margin="0 auto"
            columnGap={2}
            justifyContent="center"
            alignItems="center"
            maxWidth={400}
            mt={2}
          >
            <SummaryCard
              label="Customers"
              mainColor="#22C1C1"
              qty={summary.customersQty}
              icon={<PeopleOutlineRounded color="primary" fontSize="large" />}
            />
            <SummaryCard
              label="Payments"
              mainColor="#FB1B44"
              qty={summary.paymentsQty}
              icon={<CreditCardTwoTone color="secondary" fontSize="large" />}
            />
          </Box>
          <Box mt={4}>
            <Typography variant="h6" color="primary" mb={2}>
              Payment Methods
            </Typography>
            {/* If don't have payments yet */}
            {_isEmpty(payments) && <EmptyPaymentsData />}

            {/* Mobile payments presentation */}
            {!_isEmpty(payments) && (
              <Box display="flex" flexDirection="column" rowGap={3}>
                {payments.map((payment) => (
                  <PaymentListCard key={payment.id} payment={payment} />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}