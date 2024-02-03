import config from "@/config";

const createFullUrl = (url: string) =>
  `${config.origin}${config.apiPrefix}${url}`;

const request = (
  url: string,
  init?: Omit<RequestInit, "body"> & { body: {} }
) => {
  return window
    .fetch(createFullUrl(url), {
      headers: {
        "Content-Type": "application/json",
      },
      ...init,
      body: JSON.stringify(init?.body),
    })
    .then((res) => res.json());
};

export default request;
