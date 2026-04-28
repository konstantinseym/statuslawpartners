import bcrypt from "bcrypt";

const HASH = process.env.ADMIN_PASSWORD_HASH;

export async function verifyPassword(password) {
  if (typeof password !== "string") {
    return false;
  }

  if (!HASH) {
    throw new Err("admin password not configured");
  }

  return bcrypt.compare(password, HASH);
}
