import {
  generateJWT,
  generateRefreshToken,
  verifyJWT,
} from "../../../server/utils/jwt";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method !== "POST") {
    return res.status(405).end(); // Allow only POST requests
  }

  const { refresh_token } = req.body;

  console.log("refresh_token", refresh_token);

  try {
    const decodedRefreshToken = verifyJWT(refresh_token, true);
    console.log("decodedRefreshToken", decodedRefreshToken);

    const newAccessToken = generateJWT(decodedRefreshToken.userId);
    const newRefreshToken = generateRefreshToken(decodedRefreshToken.userId);

    res
      .status(200)
      .json({ access_token: newAccessToken, refresh_token: newRefreshToken });
  } catch (error) {
    console.log("err", error);

    res.status(401).json({ error: "Invalid refresh token" });
  }
}
