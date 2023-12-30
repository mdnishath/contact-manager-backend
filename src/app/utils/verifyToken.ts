import jwt, { JwtPayload } from 'jsonwebtoken';

// verify token async await
export const verifyToken = async (token: string, secretKey: string): Promise<JwtPayload> => {
  return new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};
