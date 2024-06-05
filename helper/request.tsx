import config from "@/config";
import { IBaseResponse } from "@/types/api";
import { getToken } from "./storage";
import { enqueueSnackbar } from "notistack";
import { Alert } from "@mui/material";

const createFullUrl = (url: string) =>
  `${config.origin}${config.apiPrefix}${url}`;

function request<T>(
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
      const result: IBaseResponse<T> = await res.json();
      console.log(result);
      if (result.code !== 200) {
        enqueueSnackbar({
          content: (
            <Alert variant="filled" severity="error">
              This is a filled error Alert.
            </Alert>
          ),
        });
      }
      return result;
    })
    .catch((reason) => {
      console.log(reason);
      enqueueSnackbar({
        content: (
          <Alert variant="filled" severity="error">
            This is a filled error Alert.
          </Alert>
        ),
      });
    });
}

export default request;
