import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export abstract class APIService {
  protected api: AxiosInstance;
  protected baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    this.api = axios.create({
      baseURL: this.baseURL,
    });

    this.setupInterceptors();
  }

  /*  INTERCEPTORS  */

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: any }) => {
    if (error.response?.status === 401 && !error.config?._retry) {
      error.config._retry = true;
      await this.handleUnauthorizedError();
      return this.api(error.config);
    }
    return Promise.reject(error);
  }
);
  }

  /* TOKEN HELPERS*/

  protected getAccessToken() {
    return localStorage.getItem("access");
  }

  protected getRefreshToken() {
    return localStorage.getItem("refresh");
  }

  protected setAccessToken(token: string) {
    localStorage.setItem("access", token);
  }
private async handleUnauthorizedError() {
  const refreshToken = this.getRefreshToken();
  if (!refreshToken) return;

  try {
    const res = await axios.post<{ access: string }>(
      `${this.baseURL}/auth/token/refresh/`,
      { refresh: refreshToken }
    );

    this.setAccessToken(res.data.access);
  } catch (err) {
    console.error("Token refresh failed", err);
    localStorage.clear();
    window.location.href = "/login";
  }
}

  /*  HTTP METHODS (GENERIC)  */

  protected get<T>(url: string, config = {}): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  protected post<T>(
    url: string,
    data?: any,
    isMultipart = false
  ): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, {
      headers: isMultipart
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });
  }

  protected put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  protected patch<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(url, data);
  }

  protected delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url);
  }
}
