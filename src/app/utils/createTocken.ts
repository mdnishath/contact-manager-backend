import jwt, { JwtPayload } from 'jsonwebtoken';

//create token using async await
export const createToken = async (payload: JwtPayload, secretKey: string, expiresIn: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn: expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
};

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
