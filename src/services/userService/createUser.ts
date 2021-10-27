import bcrypt from 'bcrypt';
import { connectToDb } from '@models/index';
import { IUser } from '@models/user';
import { v4 } from 'uuid';

export const createUser = async (input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<IUser> => {
  const hashed = await bcrypt.hash(input.password, 10);
  const { Users } = await connectToDb();
  const result = await Users.insertOne({
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    createdAt: new Date(),
    authorization: {
      password: hashed,
      token: v4(),
    },
  });
  return Users.findOne({
    _id: result.insertedId,
  });
};
