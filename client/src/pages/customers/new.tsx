import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import BackIconButton from "@components/BackIconButton";
import FormFullWidth from "@components/FormFullWidth";
import Layout from "@components/Layout";
import PageTitle from "@components/PageTitle";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import { IPostCustomerResponse } from "@infra/interfaces/ReponseInterfaces";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Required." })
    .max(100, { message: "Invalid." }),
  email: z
    .string()
    .min(1, { message: "Required." })
    .email({ message: "Invalid." }),
  telephone: z.string().min(7, { message: "Required." }),
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

  return { props: {} };
};

export default function NewCustomer() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleCreateCustomer: SubmitHandler<IFormSchema> = async (data) => {
    try {
      const res = await HttpClientHandler.post<IPostCustomerResponse>(
        AppEndpoints.api.customers,
        data
      );

      const { customerID } = res;

      if (customerID) {
        router.push(AppRoutes.customersIndex);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <BackIconButton href={AppRoutes.customersIndex} />
      <Paper sx={{ p: 2 }}>
        <PageTitle bottomDivider>New Customer</PageTitle>
        <FormFullWidth
          autoComplete="off"
          onSubmit={handleSubmit(handleCreateCustomer)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Name"
                    required
                    fullWidth
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Street"
                    error={!!errors.location?.street1?.message}
                    helperText={errors.location?.street1?.message}
                    fullWidth
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
    </Layout>
  );
}
