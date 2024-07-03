if (!process.env.JWT_SECRET_KEY) {
  throw new Error("MISSING JWT_SECRET_KEY");
}
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
