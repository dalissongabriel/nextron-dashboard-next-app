export interface ILocation {
  id?: number;
  country: string;
  street1: string;
}

export interface ICustomer {
  customerId: number;
  email: string;
  location: ILocation;
  locationId: number;
  name: string;
  telephone: string;
}
