import { NextApiRequest, NextApiResponse } from "next";
import { ProfileDbMemory } from "../../adapters/ProfileDb/ProfileDbMemory";

import { Profile, ProfileDbInterface } from "../../types/user";

import { GetUserProfileUseCase } from "../../useCases/profile";
import { withSession } from "../../utils/session";

type ErrorResponse = {
  error: string;
};

type LoginResponse = {
  profile: Profile | null;
};

async function getProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | ErrorResponse>,
  profileDb: ProfileDbInterface = new ProfileDbMemory()
) {
  const { user } = req.session;

  if (!user) {
    res.send({ profile: null });
    return;
  }

  const profileUseCase = new GetUserProfileUseCase(profileDb);
  const profile = await profileUseCase.execute(user.id);
  res.send({ profile });
}

export default withSession(getProfileHandler);
