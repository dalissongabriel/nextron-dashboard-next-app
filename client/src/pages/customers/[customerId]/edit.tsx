import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import BackIconButton from "@components/BackIconButton";
import Container from "@components/Container";
import FormFullWidth from "@components/FormFullWidth";
import Layout from "@components/Layout";
import PageTitle from "@components/PageTitle";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import { ICustomerDataResponse } from "@infra/interfaces/ReponseInterfaces";
import { ICustomer } from "@models/CustomersModels";

interface Props {
  customer: ICustomer;
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Required." })
    .max(100, { message: "Invalid." }),
  email: z
    .string()
    .min(1, { message: "Required." })
    .email({ message: "Invalid." }),
  telephone: z.string().min(1, { message: "Required." }),
  location: z.object({
    country: z.string().max(100, { message: "Invalid." }).nullable(),
    street1: z.string().max(355, { message: "Invalid." }).nullable(),
  }),
});

type IFormSchema = z.output<typeof schema>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);

  if (!token) {
    return redirectNotAuthenticated;
  }

  const customerId = Number(ctx.params?.customerId);

  const res = await HttpClientHandler.get<ICustomerDataResponse>(
    AppEndpoints.api.customerId(customerId),
    ctx
  );

  const handledCustomerData: ICustomer = {
    customerId: res.customer.customerID,
    email: res.customer.email,
    name: res.customer.name,
    telephone: res.customer.telephone,
    location: res.customer.Location,
    locationId: res.customer.location_id,
  };

  return {
    props: {
      customer: handledCustomerData,
    },
  };
};

export default function EditCustomer({ customer }: Props) {
  const router = useRouter();
  const customerId = Number(router.query?.customerId);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleEditCustomer: SubmitHandler<IFormSchema> = async (data) => {
    try {
      await HttpClientHandler.post(AppEndpoints.api.customers, {
        ...data,
        customerId: customerId,
      });

      router.push(AppRoutes.customersIndex);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container>
        <BackIconButton href={AppRoutes.customersIndex} />
        <Paper sx={{ p: 2 }}>
          <PageTitle bottomDivider>Edit Customer</PageTitle>
          <FormFullWidth
            autoComplete="off"
            onSubmit={handleSubmit(handleEditCustomer)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  defaultValue={customer.name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      fullWidth
                      required
                      autoComplete="off"
                      error={!!errors.name?.message}
                      helperText={errors.name?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  defaultValue={customer.email}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="E-mail"
                      type="email"
                      required
                      fullWidth
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="telephone"
                  defaultValue={customer.telephone}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Telephone"
                      required
                      fullWidth
                      error={!!errors.telephone?.message}
                      helperText={errors.telephone?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="location.country"
                  defaultValue={customer.location.country}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Country"
                      fullWidth
                      error={!!errors.location?.country?.message}
                      helperText={errors.location?.country?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="location.street1"
                  defaultValue={customer.location.street1}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Street"
                      fullWidth
                      error={!!errors.location?.street1?.message}
                      helperText={errors.location?.street1?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{ color: "white" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "..." : "submit"}
                </Button>
              </Grid>
            </Grid>
          </FormFullWidth>
        </Paper>
      </Container>
    </Layout>
  );
}
