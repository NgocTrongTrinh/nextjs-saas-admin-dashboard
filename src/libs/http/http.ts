import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

type RequestConfig = InternalAxiosRequestConfig & {
  disabledToken?: boolean;
};

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(this.attachToken);
    this.instance.interceptors.response.use(
      (res: any) => res.data,
      this.handleError,
    );
  }

  private attachToken(config: RequestConfig) {
    if (!config.disabledToken) {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('access_token')
          : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    delete config.disabledToken;
    return config;
  }

  private handleError(error: AxiosError) {
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
      });
    }

    return Promise.reject({
      status: error.response.status,
      message: (error.response.data as any)?.message || 'Something went wrong',
    });
  }

  // ===== HTTP METHODS =====
  get<T>(url: string, params?: unknown, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, { params, ...config });
  }

  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

const http = new HttpClient();
export default http;
