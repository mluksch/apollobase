import { LoginInput } from '@generated/graphql';
import { IUser } from '../models/user';
import { connectToDb } from '../models';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

export const loginUser = async (input: LoginInput): Promise<IUser | null> => {
  const db = await connectToDb();
  const user = await db.Users.findOne({
    email: input.email,
  });
  if (user?.authorization?.password) {
    const isValid = await bcrypt.compare(
      input.password,
      user.authorization.password,
    );
    if (isValid) {
      const updatedUser = await db.Users.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: {
            'authorization.token': v4(),
          },
        },
      );
      return updatedUser.value;
    }
  }
  return null;
};
