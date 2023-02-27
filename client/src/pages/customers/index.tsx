import { AddCircleOutlined } from "@mui/icons-material";
import { Box, Button, Paper } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";

import CustomerListCard from "@components/CustomerListCard";
import Layout from "@components/Layout";
import PageTitle from "@components/PageTitle";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import { ICustomerListResponse } from "@infra/interfaces/ReponseInterfaces";
import { ICustomer } from "@models/CustomersModels";

interface Props {
  customers: ICustomer[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);

  if (!token) {
    return redirectNotAuthenticated;
  }

  const res = await HttpClientHandler.get<ICustomerListResponse>(
    AppEndpoints.api.customers,
    ctx
  );

  const handledCustomersData: ICustomer[] = res.customers.map((customer) => ({
    customerId: customer.customerID,
    email: customer.email,
    name: customer.name,
    telephone: customer.telephone,
    location: customer.Location,
    locationId: customer.location_id,
  }));

  return { props: { customers: handledCustomersData } };
};

export default function CustomerIndex({ customers }: Props) {
  return (
    <Layout>
      <Box
        sx={{ display: "flex", flexDirection: "column", padding: "1rem 1rem" }}
      >
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <PageTitle bottomDivider>Customers</PageTitle>
            <Button
              LinkComponent={Link}
              href={AppRoutes.customersNew}
              color="primary"
              variant="contained"
              id="customer-btn-new-add-customer"
              data-testid="customer-btn-new-add-customer"
              sx={{
                color: "white",
                display: { md: "flex", sm: "none", xs: "none" },
              }}
              startIcon={<AddCircleOutlined />}
            >
              Add Customer
            </Button>
          </Box>

          <Button
            LinkComponent={Link}
            href={AppRoutes.customersNew}
            color="primary"
            variant="contained"
            id="customer-btn-new-add-customer"
            data-testid="customer-btn-new-add-customer"
            sx={{
              color: "white",
              display: { md: "none" },
            }}
            startIcon={<AddCircleOutlined />}
          >
            Add Customer
          </Button>
          <Box mt={2}>
            {customers?.map((customer) => (
              <CustomerListCard key={customer.customerId} customer={customer} />
            ))}
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}
