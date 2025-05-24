import { AxiosResponse } from 'axios';

export type RequestError = {
  errors: {
    code: number;
    reason: string;
  };
};

export type RequestSuccess = {
  success: boolean;
};

export type RequestStatus = RequestError & RequestSuccess;

export type AxiosRestResponse<T> = Promise<AxiosResponse<T & RequestStatus>>;
