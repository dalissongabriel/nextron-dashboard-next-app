import { GetServerSideProps } from "next";

import BackIconButton from "@components/BackIconButton";
import Layout from "@components/Layout";
import PaymentIndexCard from "@components/PaymentIndexCard";
import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { redirectNotAuthenticated } from "@infra/config/SessionConfigs";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import { IPaymentResponse } from "@infra/interfaces/ReponseInterfaces";
import { IPaymentMethod } from "@models/PaymentMethodsModels";

interface Props {
  payment: IPaymentMethod;
  customerId: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = CookiesHandler.getToken(ctx);

  if (!token) {
    return redirectNotAuthenticated;
  }

  const paymentMethodId = Number(ctx.params?.paymentMethodId);
  const customerId = Number(ctx.params?.customerId);

  const res = await HttpClientHandler.get<IPaymentResponse>(
    AppEndpoints.api.paymentMethodId(paymentMethodId),
    ctx
  );

  const { payment } = res;

  return {
    props: {
      payment,
      customerId,
    },
  };
};

export default function CustomerPaymentMethodIndex({
  payment,
  customerId,
}: Props) {
  return (
    <Layout>
      <BackIconButton href={AppRoutes.customersId(customerId)} />
      <PaymentIndexCard payment={payment} />
    </Layout>
  );
}
