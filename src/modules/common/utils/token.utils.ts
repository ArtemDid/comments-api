import jwt from 'jsonwebtoken';

export const generateToken = (id: number): string => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET);
};
