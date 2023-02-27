import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";

import { AuthProvider } from "@contexts/AuthContext";
import { themeOptions } from "@theme/AppTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nextron | Front end Challenge</title>
      </Head>
      <CssBaseline />
      <ThemeProvider theme={themeOptions}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
