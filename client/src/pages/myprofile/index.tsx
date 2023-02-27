import Layout from "@components/Layout";
import PageTitle from "@components/PageTitle";
import { useAuthContext } from "@contexts/AuthContext";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import { ISessionResponse } from "@infra/interfaces/ReponseInterfaces";
import { IUser } from "@models/UsersModels";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { GetServerSideProps } from "next";

interface Props {
  user: IUser;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);
  if (!token) {
    return redirectNotAuthenticated;
  }

  const res = await HttpClientHandler.get<ISessionResponse>(
    AppEndpoints.api.session,
    ctx
  );

  const { user } = res;
  return {
    props: {
      user,
    },
  };
};

export default function MyProfile({ user }: Props) {
  const { handleLogout } = useAuthContext();
  return (
    <Layout>
      <Paper sx={{ p: 2 }}>
        <PageTitle bottomDivider>My profile</PageTitle>
        <Grid container spacing={2} maxWidth={500}>
          <Grid item xs={12}>
            <TextField label="Name" value={user.name} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="E-mail" value={user.email} fullWidth disabled />
          </Grid>
        </Grid>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Layout>
  );
}
