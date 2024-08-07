import config from "@/config";
import { BaseResponse } from "@/types/api";
import { getToken } from "./storage";
import { Alert } from "@mui/material";
import { error } from "./alert";

const createFullUrl = (url: string) =>
  `${config.origin}${config.apiPrefix}${url}`;

function request<T extends BaseResponse>(
  url: string,
  init?: Omit<RequestInit, "body"> & { body?: any }
) {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["authorization"] = token;
  }
  return window
    .fetch(createFullUrl(url), {
      headers,
      ...init,
      body: JSON.stringify(init?.body),
    })
    .then(async (res) => {
      const result = (await res.json()) as T;
      if (result.code !== 200) {
        error(result.msg);
      }
      if (result.code === 401 && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return result;
    })
    .catch((reason) => {
      console.log(reason);
      return Promise.reject(reason);
    });
}

export default request;
