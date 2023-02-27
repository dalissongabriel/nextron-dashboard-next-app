export const AppRoutes = {
  customersId: (id: number) => `/customers/${id}`,
  customersIdEdit: (id: number) => `/customers/${id}/edit`,
  customersIdPaymentMethodsNew: (id: number) =>
    `/customers/${id}/paymentmethods/new`,
  customersIndex: "/customers",
  customersNew: "/customers/new",
  index: "/",
  login: "/login",
  register: "/register",
};
