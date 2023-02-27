import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpMethodsEnum, IHttpClient } from "@infra/interfaces/HttpInterfaces";

export class FetchAdapter implements IHttpClient {
  private getAuthorizationToken(ctx?: any) {
    return CookiesHandler.getToken(ctx);
  }

  private setAuthorizationHeaders(headers?: any, ctx?: any) {
    const token = this.getAuthorizationToken(ctx);

    if (token) {
      return {
        ...headers,
        Cookie: `token=${token}`,
      };
    }
    return headers;
  }

  async get<R>(url: string, ctx?: any): Promise<R> {
    const res = await fetch(url, {
      method: HttpMethodsEnum.GET,
      credentials: "include",
      headers: this.setAuthorizationHeaders(
        {
          Accept: "application/json",
        },
        ctx
      ),
    });
    return await res.json();
  }

  async post<R, T = any>(url: string, data: T, ctx?: any): Promise<R> {
    const res = await fetch(url, {
      method: HttpMethodsEnum.POST,
      body: JSON.stringify(data),
      credentials: "include",
      headers: this.setAuthorizationHeaders(
        {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        ctx
      ),
    });
    return await res.json();
  }
}
