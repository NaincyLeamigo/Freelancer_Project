import bcrypt from "bcrypt";

export const Hash = {
  async hashPassword(plain: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
  },

  async compare(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
};
