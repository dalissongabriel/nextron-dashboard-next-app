export interface IPaymentMethod {
  id: number;
  location_id: number;
  BillingAddress: IPaymentMethodBillingAddress;
  customerId: number;
  registration_time: string;
  methodType: string;
  cardBin: string;
  cardLastFour: string;
  expiryMonth: number;
  expiryYear: number;
  eWallet: string;
  nameOnCard: string;
}

export interface IPaymentMethodBillingAddress {
  id: number;
  latitude: number;
  longitude: number;
  country: string;
  street1: string;
}
