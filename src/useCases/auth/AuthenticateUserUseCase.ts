import { AuthError } from '../../errors';
import { SessionUser } from '../../types/session';
import { UserDbInterface } from '../../types/user';

export class AuthenticateUserUseCase {
  db: UserDbInterface;

  constructor(db: UserDbInterface) {
    this.db = db;
  }

  async execute(username: string, password: string): Promise<SessionUser> {
    const user = await this.db.authenticateUser(username, password);
    if (!user) {
      throw new AuthError("incorrect username or password");
    }
    return user;
  }
}
