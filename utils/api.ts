import { AxiosError } from "axios";

export const onError = (err: AxiosError) => {
  alert(err?.response?.data);
};
