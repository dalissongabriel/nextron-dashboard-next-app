export const AppRoutes = {
  customersId: (id: number) => `/customers/${id}`,
  customersIdEdit: (id: number) => `/customers/${id}/edit`,
  customersIdPaymentMethodsIndex: (customerId: number, paymentId: number) =>
    `/customers/${customerId}/paymentmethods/${paymentId}`,
  customersIdPaymentMethodsNew: (id: number) =>
    `/customers/${id}/paymentmethods/new`,
  customersIndex: "/customers",
  customersNew: "/customers/new",
  index: "/",
  login: "/login",
  overviewIndex: "/overview",
  paymentsId: (id: number) => `/paymentmethods/${id}`,
  register: "/register",
  myProfile: "/myprofile",
};
