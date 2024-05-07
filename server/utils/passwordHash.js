import bcrypt from "bcrypt";

export const passwordHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);

  return hash;
};

export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
