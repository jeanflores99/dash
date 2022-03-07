import { BaseRequest } from "./base-request";

export const scaleRequest = (token: null | string = "") => {
  const request = BaseRequest(process.env.NEXT_PUBLIC_SCALE_URL || "", token);

  return request;
};
