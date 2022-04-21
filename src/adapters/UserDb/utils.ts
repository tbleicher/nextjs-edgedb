import bcrypt from "bcryptjs";

async function getSalt(): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err: Error, salt: string) {
      if (err) return reject(err);
      return resolve(salt);
    });
  });
}

export async function getPasswordHash(password: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const salt = await getSalt();

    return bcrypt.hash(password, salt, function (err: Error, hash: string) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}
