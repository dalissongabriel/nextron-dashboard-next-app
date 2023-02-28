import Cookies from "cookies";

export interface ICookies {
  get: (
    cookieName: string,
    options?: Partial<Cookies.IOptions>,
    ctx?: any
  ) => string;
  set: (
    cookieName: string,
    data: any,
    options?: Partial<Cookies.IOptions>,
    ctx?: any
  ) => void;
  delete: (
    cookieName: string,
    options?: Partial<Cookies.IOptions>,
    ctx?: any
  ) => void;
}

export interface ISessionCookies {
  getToken(ctx?: any): string;
  setToken(token: string): void;
  deleteToken(): void;
}
