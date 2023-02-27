export enum HttpMethodsEnum {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

export enum StatusCodeEnum {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_AUTHORIZED = 401,
}

export interface IHttpClient {
  get<R>(url: string, ctx?: any): Promise<R>;
  post<R, T>(url: string, data: T, ctx?: any): Promise<R>;
}
