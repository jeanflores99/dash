import axios, { AxiosRequestConfig } from "axios";
import urljoin from "url-join";

export const BaseRequest = (urlBase: string, token: string | null = null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const get = (link: string, config?: AxiosRequestConfig): Promise<any> => {
    return axios.get(urljoin(urlBase, link), config);
  };

  const post = (
    link: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    return axios.post(urljoin(urlBase, link), data, config);
  };

  const put = (
    link: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    return axios.put(urljoin(urlBase, link), data, config);
  };

  const destroy = (link: string, config?: AxiosRequestConfig): Promise<any> => {
    return axios.delete(urljoin(urlBase, link), config);
  };

  return {
    urlBase,
    get,
    post,
    put,
    destroy,
    headers: axios.defaults.headers.common,
  };
};
