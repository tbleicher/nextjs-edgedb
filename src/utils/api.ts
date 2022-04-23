import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';

import { HTTPError } from '../errors';

export const onError = (err: AxiosError) => {
  alert(err?.response?.data);
};

export function sendErrorResponse(res: NextApiResponse, err: unknown) {
  const { message = `${err}`, statusCode = 400 } = err as HTTPError;
  return res.status(statusCode).json({ message });
}
