import jwt from 'jsonwebtoken';

export const generateToken = (id: number) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '7d' });
};
