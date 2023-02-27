import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import FormFullWidth from "@components/FormFullWidth";
import PasswordTextField from "@components/PasswordTextField";
import PublicLayout from "@components/PublicLayout";
import { useAuthContext } from "@contexts/AuthContext";
import { AppRoutes } from "@infra/config/AppRoutes";
import { bpToPx } from "@theme/ThemeUtils";

export default function Login() {
  const {
    signInFormMethods,
    signInFormState,
    onSignIn,
    handleClearSignErrors,
  } = useAuthContext();

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    trigger,
  } = signInFormMethods;

  useEffect(() => {
    return () => {
      reset({
        email: "",
        password: "",
      });
      handleClearSignErrors();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

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
          Front end Challenge
        </Typography>
        <FormFullWidth
          onSubmit={handleSubmit(onSignIn)}
          id="login-form-id"
          data-testid="login-form-id"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, ...rest } }) => (
                  <TextField
                    label="E-mail"
                    type="email"
                    autoComplete="username"
                    fullWidth
                    required
                    onChange={onChange}
                    onBlur={onBlur}
                    inputProps={{
                      "data-testid": "login-input-email-id",
                      id: "login-input-email-id",
                    }}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    {...rest}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, ...rest } }) => (
                  <PasswordTextField
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                  />
                )}
              />
              <Grid
                item
                xs={12}
                justifyContent="center"
                display="flex"
                flexDirection="column"
              >
                {signInFormState.msg && (
                  <Typography mt={1} color="red" variant="caption">
                    &bull; {signInFormState.msg}
                  </Typography>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={(theme) => ({
                    marginTop: theme.spacing(4),
                  })}
                  id="login-btn-submit-id"
                  data-testid="login-btn-submit-id"
                >
                  {isSubmitting ? "..." : "login"}
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="center"
                display="flex"
                color="GrayText"
                flexDirection="column"
                mt={2}
              >
                <Divider light />
                <Typography
                  variant="caption"
                  color="GrayText"
                  textAlign="center"
                  marginTop={2}
                >
                  I&apos;m not a customer yet
                </Typography>
                <Button
                  LinkComponent={Link}
                  href={AppRoutes.register}
                  color="secondary"
                  variant="text"
                  fullWidth
                  size="small"
                  id="login-btn-sign-up-id"
                  data-testid="login-btn-sign-up-id"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormFullWidth>
      </Paper>
    </PublicLayout>
  );
}
