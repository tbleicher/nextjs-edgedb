import { NextApiRequest, NextApiResponse } from "next";
import { ProfileDbMemory } from "../../../adapters/ProfileDb/ProfileDbMemory";
import { UserDbMemory } from "../../../adapters/UserDb/UserDbMemory";
import {
  Profile,
  ProfileDbInterface,
  UserDbInterface,
} from "../../../types/user";
import { AuthenticateUserUseCase } from "../../../useCases/auth";
import { GetUserProfileUseCase } from "../../../useCases/profile";
import { withSession } from "../../../utils/session";

type LoginResponse = {
  profile: Profile | null;
};

async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
  userDb: UserDbInterface = new UserDbMemory(),
  profileDb: ProfileDbInterface = new ProfileDbMemory()
) {
  const username: string = req.body.username || "";
  const password: string = req.body.password || "";

  const useCase = new AuthenticateUserUseCase(userDb);
  const user = await useCase.execute(username, password);

  req.session.user = user;
  await req.session.save();

  const profileUseCase = new GetUserProfileUseCase(profileDb);
  const profile = await profileUseCase.execute(user.id);
  res.send({ profile });
}

export default withSession(loginHandler);
