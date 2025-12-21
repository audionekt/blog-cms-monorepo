import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API base URL configuration:
 * - When NEXT_PUBLIC_API_URL is set, Next.js rewrites proxy /api/* requests to the backend
 * - When not set (MSW mode), requests go to /api/* and MSW intercepts them
 * 
 * In both cases, we use an empty base URL since:
 * - Real API: Next.js rewrites handle proxying to avoid CORS
 * - MSW: Intercepts relative /api/* requests
 */
const API_BASE_URL = '';

/**
 * Generic API Client using Axios
 * 
 * This client works seamlessly with both:
 * - Mock Service Worker (MSW) in development (when no API URL configured)
 * - Real backend API via Next.js rewrites (when API URL is configured)
 * 
 * All requests use relative URLs (/api/v1/*) which are either:
 * - Intercepted by MSW in mock mode
 * - Proxied by Next.js rewrites to the real backend
 */
class ApiClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth tokens, logging, etc.
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = typeof window !== 'undefined' 
          ? localStorage.getItem('auth_token') 
          : null;
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors, logging, etc.
    this.instance.interceptors.response.use(
      (response) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`, {
            data: response.data,
          });
        }

        return response;
      },
      (error) => {
        // Log errors
        if (process.env.NODE_ENV === 'development') {
          console.error('[API Error]', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
          });
        }

        // Handle specific error cases
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          
          if (status === 401) {
            // Unauthorized - clear token and redirect to login
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth_token');
              // You can add redirect logic here
            }
          }
          
          if (status === 404) {
            error.message = 'Resource not found';
          }
          
          if (status >= 500) {
            error.message = 'Server error. Please try again later.';
          }
        } else if (error.request) {
          // Request made but no response received
          error.message = 'Network error. Please check your connection.';
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Generic GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  /**
   * Generic POST request
   */
  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  /**
   * Generic PUT request
   */
  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  /**
   * Generic PATCH request
   */
  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  /**
   * Generic DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  /**
   * Generic request method for full control
   */
  async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config);
  }

  /**
   * Get the axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Export the class for custom instances
export { ApiClient };

