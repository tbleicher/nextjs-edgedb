import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../utils/session";

function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send({ ok: true });
}

export default withSession(logoutHandler);
