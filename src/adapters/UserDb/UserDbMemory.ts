import bcrypt from "bcryptjs";
import { SessionUser } from "../../types/session";
import { UserData, UserDbInterface } from "../../types/user";
import { USERS } from "./userData";

export class UserDbMemory implements UserDbInterface {
  private _users: UserData[];

  constructor() {
    this._users = [...USERS];
  }

  async authenticateUser(
    username: string,
    password: string
  ): Promise<SessionUser | null> {
    const user = this._users.find((user) => user.username === username) || null;
    const authenticated = await bcrypt.compare(password, user?.hash || "");

    if (!user || !authenticated) {
      throw new Error("incorrect username or password");
    }

    const { hash, ...sessionUser } = user;

    return sessionUser;
  }
}
