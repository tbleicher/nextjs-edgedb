import { SessionUser } from './session';

export type UserData = SessionUser & {
  hash: string;
};

export type Profile = {
  userId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  userName: string;
};

export interface ProfileDbInterface {
  getProfileByUserId(userId: string): Promise<Profile | null>;
}

export interface UserDbInterface {
  authenticateUser(
    username: string,
    password: string
  ): Promise<SessionUser | null>;
}
