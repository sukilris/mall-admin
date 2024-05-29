import config from "@/config";
import { IBaseResponse } from "@/types/api";

const createFullUrl = (url: string) =>
  `${config.origin}${config.apiPrefix}${url}`;

const request = <T>(
  url: string,
  init?: Omit<RequestInit, "body"> & { body?: any }
) => {
  return window
    .fetch(createFullUrl(url), {
      headers: {
        "Content-Type": "application/json",
      },
      ...init,
      body: JSON.stringify(init?.body),
    })
    .then<IBaseResponse<T>>((res) => res.json());
};

export default request;
