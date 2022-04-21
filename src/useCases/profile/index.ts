import { Profile, ProfileDbInterface } from "../../types/user";

export class GetUserProfileUseCase {
  db: ProfileDbInterface;

  constructor(db: ProfileDbInterface) {
    this.db = db;
  }

  async execute(userId: string): Promise<Profile | null> {
    return this.db.getProfileByUserId(userId);
  }
}
