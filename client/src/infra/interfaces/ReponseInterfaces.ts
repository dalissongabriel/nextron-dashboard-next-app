import { IBackendCustomer } from "@models/CustomersModels";
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

export interface ICustomerListResponse {
  customers: IBackendCustomer[];
}

export interface IPaymentMethodResponse {
  payments: IPaymentMethod[];
}

export interface IPostCustomerResponse {
  customerID: number;
}

export interface ICustomerDataResponse {
  customer: IBackendCustomer;
}
