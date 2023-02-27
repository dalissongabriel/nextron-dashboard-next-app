import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import _isEmpty from "lodash/isEmpty";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import FormFullWidth from "@components/FormFullWidth";
import PasswordTextField from "@components/PasswordTextField";
import PublicLayout from "@components/PublicLayout";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import { IRegisterResponse } from "@infra/interfaces/ReponseInterfaces";
import { bpToPx } from "@theme/ThemeUtils";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Required." })
    .max(100, { message: "Invalid." })
    .email({ message: "Invalid." }),
  password: z
    .string()
    .min(1, { message: "Required." })
    .min(4, { message: "Password needs at least 4 characters." }),
  name: z.string().min(1, { message: "Required." }),
});

type IFormSchema = z.output<typeof schema>;

interface IErrorState {
  msg: string;
  errors: string[];
}

export default function Register() {
  const router = useRouter();
  const [errorState, setErrorState] = useState<IErrorState>({
    msg: "",
    errors: [],
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormSchema>({ resolver: zodResolver(schema) });

  const handleRegisterNewUser: SubmitHandler<IFormSchema> = async (data) => {
    const { email, password, name } = data;

    try {
      const res = await HttpClientHandler.post<IRegisterResponse>(
        AppEndpoints.api.register,
        {
          email,
          password,
          name,
        }
      );

      const { success, msg, errors } = res;

      if (!success) {
        return setErrorState({ msg, errors: errors || [] });
      }

      router.push(AppRoutes.login);
    } catch (e: any) {
      setErrorState((prev) => ({
        ...prev,
        message: e.toString(),
      }));
    }
  };

  return (
    <PublicLayout>
      <Paper
        sx={(theme) => ({
          maxWidth: bpToPx(theme.breakpoints.values.sm),
          padding: "2rem 0.5rem",
        })}
      >
        <Typography color="primary" fontSize="2rem" textAlign="center">
          Nextron
        </Typography>
        <Typography
          color="GrayText"
          fontSize="1rem"
          textAlign="center"
          marginBottom={5}
        >
          Register
        </Typography>

        <FormFullWidth onSubmit={handleSubmit(handleRegisterNewUser)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Name"
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
                    autoComplete="username"
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
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <PasswordTextField
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
              {!_isEmpty(errorState.errors) && (
                <Box mt={1}>
                  {errorState.errors.map((registerError, index) => {
                    return (
                      <Typography color="red" variant="caption" key={index}>
                        {" "}
                        &bull; {registerError}
                      </Typography>
                    );
                  })}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="outlined"
                color="primary"
                id="login-btn-submit-id"
                data-testid="login-btn-submit-id"
              >
                {isSubmitting ? "..." : "register"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider light sx={{ mb: 1 }} />
              <Button
                LinkComponent={Link}
                href={AppRoutes.login}
                color="secondary"
                variant="text"
                fullWidth
                size="small"
                id="login-btn-sign-up-id"
                data-testid="login-btn-sign-up-id"
              >
                Back
              </Button>
            </Grid>
            <div className="message">{errorState.msg}</div>
          </Grid>
        </FormFullWidth>
      </Paper>
    </PublicLayout>
  );
}
