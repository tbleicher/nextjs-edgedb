import { Profile, ProfileDbInterface } from "../../types/user";
import { PROFILES } from "./profileData";

export class ProfileDbMemory implements ProfileDbInterface {
  private _profiles: Profile[];

  constructor() {
    this._profiles = [...PROFILES];
  }

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    return this._profiles.find((profile) => profile.userId === userId) || null;
  }
}
