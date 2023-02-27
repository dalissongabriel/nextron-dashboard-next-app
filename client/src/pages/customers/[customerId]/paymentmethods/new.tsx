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

const schema = z.object({
  billingAddress: z.object({
    country: z
      .string()
      .min(1, { message: "Required." })
      .max(100, { message: "Invalid." }),
    street1: z
      .string()
      .min(1, { message: "Required." })
      .max(355, { message: "Invalid." }),
  }),
  cardBin: z
    .string()
    .min(1, { message: "Required." })
    .max(6, { message: "Invalid." }),
  cardLastFour: z
    .string()
    .min(1, { message: "Required." })
    .max(4, { message: "Invalid." }),
  eWallet: z.string().min(1, {
    message: "Required.",
  }),
  expiryMonth: z.coerce
    .number()
    .min(1, {
      message: "Required.",
    })
    .max(12, { message: "Month must be between in 1 and 12." }),
  expiryYear: z.coerce
    .number()
    .min(1, {
      message: "Required.",
    })
    .min(new Date().getFullYear(), {
      message: "Expiry year must be greather than current year.",
    }),
  methodType: z.string().min(1, { message: "Required." }),
  nameOnCard: z
    .string()
    .min(1, { message: "Required." })
    .max(100, { message: "Invalid." }),
});

type IFormSchema = z.output<typeof schema>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);

  if (!token) {
    return redirectNotAuthenticated;
  }

  return { props: {} };
};

export default function NewPaymentMethod() {
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

  const handleSubmitPaymentMethod: SubmitHandler<IFormSchema> = async (
    data
  ) => {
    try {
      const handledPayload = {
        ...data,
        customerId,
      };

      await HttpClientHandler.post(
        AppEndpoints.api.paymentMethods,
        handledPayload
      );
      router.push(AppRoutes.customersId(customerId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container>
        <BackIconButton href={AppRoutes.customersId(customerId)} />
        <Paper sx={{ p: 2 }}>
          <PageTitle bottomDivider>Post Payment Method</PageTitle>
          <FormFullWidth onSubmit={handleSubmit(handleSubmitPaymentMethod)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="methodType"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Method Type"
                      required
                      error={!!errors.methodType?.message}
                      helperText={errors.methodType?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cardBin"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Card bin"
                      required
                      error={!!errors.cardBin?.message}
                      helperText={errors.cardBin?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cardLastFour"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Card Last Four"
                      required
                      error={!!errors.cardLastFour?.message}
                      helperText={errors.cardLastFour?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="expiryMonth"
                  defaultValue={1}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Expiry Month"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.expiryMonth?.message}
                      helperText={errors.expiryMonth?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="expiryYear"
                  defaultValue={new Date().getFullYear() + 5}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Expiry Year"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.expiryYear?.message}
                      helperText={errors.expiryYear?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="eWallet"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="eWallet"
                      error={!!errors.eWallet?.message}
                      helperText={errors.eWallet?.message}
                      fullWidth
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="nameOnCard"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Name on Card"
                      error={!!errors.nameOnCard?.message}
                      helperText={errors.nameOnCard?.message}
                      fullWidth
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="billingAddress.country"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Country"
                      error={!!errors.billingAddress?.country?.message}
                      helperText={errors.billingAddress?.country?.message}
                      fullWidth
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="billingAddress.street1"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Street"
                      fullWidth
                      error={!!errors.billingAddress?.street1?.message}
                      helperText={errors.billingAddress?.street1?.message}
                      required
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
