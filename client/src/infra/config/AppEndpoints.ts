import { AppURLs } from "./AppUrls";

export const AppEndpoints = {
  next: {},
  api: {
    customerId: (id: number) => `${AppURLs.api}/customers/${id}`,
    customerIdPaymentMethods: (id: number) =>
      `${AppURLs.api}/customers/${id}/paymentmethods`,
    customers: `${AppURLs.api}/customers`,
    login: `${AppURLs.api}/login`,
    register: `${AppURLs.api}/register`,
    session: `${AppURLs.api}/session`,
    paymentMethods: `${AppURLs.api}/paymentmethods`,
  },
};
