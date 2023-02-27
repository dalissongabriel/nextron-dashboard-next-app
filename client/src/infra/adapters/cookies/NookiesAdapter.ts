import { Cookie } from "cookies";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import {
  sessionCookieName,
  sessionDuration,
} from "@infra/config/SessionConfigs";
import { ICookies, ISessionCookies } from "@infra/interfaces/CookiesInterfaces";

export class NookiesAdapter implements ICookies<Cookie>, ISessionCookies {
  getToken(ctx?: any): string {
    return this.get(sessionCookieName, ctx);
  }

  setToken(token: string): void {
    this.set(sessionCookieName, token, { maxAge: sessionDuration });
  }

  deleteToken(): void {
    this.delete(sessionCookieName);
  }

  get(cookieName: string, ctx?: any) {
    const cookies = parseCookies(ctx);
    return cookies[cookieName];
  }

  set(cookieName: string, data: string, options?: Partial<Cookie>, ctx?: any) {
    setCookie(ctx, cookieName, data, options);
  }

  delete(cookieName: string, options?: Partial<Cookie>, ctx?: any) {
    destroyCookie(ctx, cookieName, options);
  }
}
