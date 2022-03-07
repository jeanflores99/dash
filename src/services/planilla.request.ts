import { BaseRequest } from "./base-request"

export const planillaRequest = (token: null | string = '') => {
  const request = BaseRequest(
    process.env.NEXT_PUBLIC_PLANILLA_URL || '',
    token
  );

  return request;
}