import { NextApiRequest, NextApiResponse } from 'next';

import { ProfileDbMemory } from '../../../adapters/ProfileDb/ProfileDbMemory';
import { UserDbMemory } from '../../../adapters/UserDb/UserDbMemory';
import { ErrorResponse } from '../../../types/api';
import { Profile, ProfileDbInterface, UserDbInterface } from '../../../types/user';
import { AuthenticateUserUseCase } from '../../../useCases/auth';
import { GetUserProfileUseCase } from '../../../useCases/profile';
import { sendErrorResponse } from '../../../utils/api';
import { withSession } from '../../../utils/session';

type LoginResponse = {
  profile: Profile | null;
};

async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | ErrorResponse>,
  userDb: UserDbInterface = new UserDbMemory(),
  profileDb: ProfileDbInterface = new ProfileDbMemory()
) {
  const username: string = req.body.username || "";
  const password: string = req.body.password || "";

  const useCase = new AuthenticateUserUseCase(userDb);
  const profileUseCase = new GetUserProfileUseCase(profileDb);

  try {
    const user = await useCase.execute(username, password);
    const profile = await profileUseCase.execute(user.id);

    req.session.user = user;
    await req.session.save();

    res.send({ profile });
  } catch (err) {
    sendErrorResponse(res, err);
  }
}

export default withSession(loginHandler);
