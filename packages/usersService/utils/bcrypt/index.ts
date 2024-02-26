import bcrypt from 'bcryptjs';

class Bcrypt {
  public async generateSalt(saltRounds: number) {
    return await bcrypt.genSalt(saltRounds);
  }

  public async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }

  public async compare(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}

export default new Bcrypt();
