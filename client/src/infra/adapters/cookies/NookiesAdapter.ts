import Cookies from "cookies";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import {
  sessionCookieName,
  sessionDuration,
} from "@infra/config/SessionConfigs";
import { ICookies, ISessionCookies } from "@infra/interfaces/CookiesInterfaces";

export class NookiesAdapter implements ICookies, ISessionCookies {
  getToken(ctx?: any): string {
    return this.get(sessionCookieName, ctx, {
      sameSite: "none",
      secure: true,
    });
  }

  setToken(token: string): void {
    this.set(sessionCookieName, token, {
      maxAge: sessionDuration,
      sameSite: "none",
      secure: true,
    });
  }

  deleteToken(): void {
    this.delete(sessionCookieName);
  }

  get(cookieName: string, ctx?: any, options?: Partial<Cookies.IOptions>) {
    const cookies = parseCookies(ctx, options);
    return cookies[cookieName];
  }

  set(
    cookieName: string,
    data: string,
    options?: Partial<Cookies.IOptions>,
    ctx?: any
  ) {
    setCookie(ctx, cookieName, data, options);
  }

  delete(cookieName: string, options?: Partial<Cookies.IOptions>, ctx?: any) {
    destroyCookie(ctx, cookieName, options);
  }
}
