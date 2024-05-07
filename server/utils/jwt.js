import jwt from "jsonwebtoken";

const secretKey = "foody_app_user_token";

const refreshSecretKey = "foody_app_user_refresh_token";

export function generateJWT(userId) {
  const payload = { userId };
  const options = { expiresIn: "1h" }; // Refresh token expires in 1 hour

  const token = jwt.sign(payload, secretKey, options); // Expires in 1 hour
  return token;
}

export function verifyJWT(token, refreshKey) {
  try {
    const decoded = jwt.verify(
      token,
      refreshKey ? refreshSecretKey : secretKey
    );
    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

export const generateRefreshToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: "7d" }; // Refresh token expires in 7 days
  return jwt.sign(payload, refreshSecretKey, options);
};
