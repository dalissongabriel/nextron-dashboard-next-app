export interface ICookies<O = any> {
  get: (cookieName: string, options?: Partial<O>, ctx?: any) => string;
  set: (cookieName: string, data: any, options?: Partial<O>, ctx?: any) => void;
  delete: (cookieName: string, options?: Partial<O>, ctx?: any) => void;
}

export interface ISessionCookies {
  getToken(ctx?: any): string;
  setToken(token: string): void;
  deleteToken(): void;
}
