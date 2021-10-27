import bcrypt from 'bcrypt';
import { connectDB } from '@models/index';
import { IUser } from '@models/user';

export const createUser = async (input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<IUser> => {
  const hashed = await bcrypt.hash(input.password, 10);
  const { Users } = await connectDB();
  const result = await Users.insertOne({
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    createdAt: new Date(),
    authorization: {
      password: hashed,
      token: hashed,
    },
  });
  return Users.findOne({
    _id: result.insertedId,
  });
};
