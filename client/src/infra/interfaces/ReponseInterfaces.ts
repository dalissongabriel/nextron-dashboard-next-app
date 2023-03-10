import { ILocation } from "@models/CustomersModels";
import { IPaymentMethod } from "@models/PaymentMethodsModels";
import { IUser } from "@models/UsersModels";

export interface ISignInResponse {
  token: string;
  success: boolean;
  msg: string;
  user: any;
}

export interface ISessionResponse {
  success: boolean;
  user: IUser;
}

export interface IRegisterResponse {
  msg: string;
  success: boolean;
  errors?: string[];
}

export interface IBackendCustomer {
  Location: ILocation;
  customerID: number;
  email: string;
  location_id: number;
  name: string;
  registration_time: Date;
  telephone: string;
}

export interface ICustomerListResponse {
  customers: IBackendCustomer[];
}
export interface ICustomerDataResponse {
  customer: IBackendCustomer;
}

export interface IPaymentsListResponse {
  payments: IPaymentMethod[];
}

export interface IPaymentResponse {
  payment: IPaymentMethod;
}

export interface IPostCustomerResponse {
  customerID: number;
}
