import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../config/session";

type RouteHandler = (req: NextApiRequest, res: NextApiResponse) => void;

export function withSession(handler: RouteHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
