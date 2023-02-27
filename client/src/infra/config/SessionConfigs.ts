import { AppRoutes } from "./AppRoutes";

export const sessionDuration = 60 * 60 * 0.5; // 30 minutes
export const sessionCookieName = "token";
export const redirectNotAuthenticated = {
  redirect: {
    destination: AppRoutes.login,
    permanent: false,
  },
};
