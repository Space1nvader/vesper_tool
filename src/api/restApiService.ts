import axios, { AxiosError, AxiosResponse, AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import { AxiosRestResponse, RequestError } from './types';

export const API_URL = '/';
class RestAPI {
  oauth: Record<string, never>;

  headers: RawAxiosRequestHeaders;

  constructor() {
    this.oauth = {};
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=5256000, must-revalidate' // 2 month,
    };
  }

  private handleSuccess = (response: AxiosResponse): AxiosResponse => response;

  private handleError = (error: AxiosError<RequestError>): Promise<object> | void => {
    console.log('error', error);
    // if (error.response?.data?.errors?.code) {
    //   return Promise.reject(new Error(mapErrorCodeToText(error.response?.data?.errors)));
    // }

    return Promise.reject(new Error('Что-то пошло не так'));
  };

  private generateUrl = (path: string): string => {
    const oauthQuery = new URLSearchParams();

    oauthQuery.append('device_id', this.oauth.device_id);
    oauthQuery.append('session_id', this.oauth.session_id);
    oauthQuery.append('account_id', this.oauth.account_id);

    return `${API_URL.replace('%s', this.oauth.host)}/${path}?${oauthQuery.toString()}`;
  };

  private create = (headers?: RawAxiosRequestHeaders): AxiosInstance => {
    // this.oauth = store.getState().oauthParams;
    // const headerAuth = { Authorization: `Bearer ${this.oauth.session_secret}` };

    const service = axios.create({
      headers: {
        ...this.headers,
        ...headers
        // ...headerAuth
      }
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);

    return service;
  };

  public get<ResponseData = undefined>(
    path: string,
    headers?: RawAxiosRequestHeaders
  ): Promise<AxiosResponse<ResponseData>> {
    const service = this.create(headers);

    return service.request({
      method: 'GET',
      url: this.generateUrl(path)
    });
  }

  public post<RequestData = EmptyObject, ResponseData = EmptyObject>(
    path: string,
    data: RequestData,
    headers?: RawAxiosRequestHeaders
  ): AxiosRestResponse<ResponseData> {
    const service = this.create(headers);

    return service.request({
      method: 'POST',
      url: this.generateUrl(path),
      data
    });
  }

  public put<RequestData = EmptyObject, ResponseData = EmptyObject>(
    path: string,
    data: RequestData,
    headers?: RawAxiosRequestHeaders
  ): AxiosRestResponse<ResponseData> {
    const service = this.create(headers);

    return service.request({
      method: 'PUT',
      url: this.generateUrl(path),
      data
    });
  }

  public patch<RequestData = EmptyObject, ResponseData = EmptyObject>(
    path: string,
    data: RequestData,
    headers?: RawAxiosRequestHeaders
  ): AxiosRestResponse<ResponseData> {
    const service = this.create(headers);

    return service.request({
      method: 'PATCH',
      url: this.generateUrl(path),
      data
    });
  }

  public delete<RequestData = EmptyObject, ResponseData = EmptyObject>(
    path: string,
    data: RequestData,
    params: Record<string, unknown>,
    headers?: RawAxiosRequestHeaders
  ): AxiosRestResponse<ResponseData> {
    const service = this.create(headers);

    return service.request({
      method: 'DELETE',
      url: this.generateUrl(path),
      data: {
        ...data
      },
      params
    });
  }
}

export default new RestAPI();
