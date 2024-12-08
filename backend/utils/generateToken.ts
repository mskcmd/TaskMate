import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const generateToken = (payload: string | any): string | null => {
  const secret = process.env.JWT_SECRET;
  console.log(secret);
  

  if (!payload || !secret) {
    console.error("JWT_SECRET is not defined or payload is missing");
    return null;
  }

  try {
    const token = jwt.sign({ data: payload }, secret as Secret, { expiresIn: "5m" });
    return token;
  } catch (error: any) {
    console.error("Error generating token:", error.message);
    return null;
  }
};

export const generateRefreshToken = (payload: string | any): string | null => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!payload || !refreshSecret) {
    console.error("JWT_REFRESH_SECRET is not defined or payload is missing");
    return null;
  }

  try {
    return jwt.sign({ data: payload }, refreshSecret as Secret, { expiresIn: "48h" });
  } catch (error: any) {
    console.error("Error generating refresh token:", error.message);
    return null;
  }
};

export const verifyToken = (token: string): JwtPayload | null => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return null;
  }

  try {
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.error("Token expired");
    } else {
      console.error("Token verification failed:", error.message);
    }
    return null;  
  }
};
