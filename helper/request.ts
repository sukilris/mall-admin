import config from "@/config";

const createFullUrl = (url: string) =>
  `${config.origin}${config.apiPrefix}${url}`;

const request = (
  url: string,
  init?: Omit<RequestInit, "body"> & { body: {} }
) => {
  return window.fetch(createFullUrl(url), {
    ...init,
    body: JSON.stringify(init?.body),
  });
};

export default request;
