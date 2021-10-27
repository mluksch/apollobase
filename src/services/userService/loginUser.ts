import { LoginInput } from '@generated/graphql';
import { IUser } from '../models/user';
import { connectDB } from '../models';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

export const loginUser = async (input: LoginInput): Promise<IUser | null> => {
  const db = await connectDB();
  const user = await db.Users.findOne({
    email: input.email,
  });
  if (user) {
    const isValid = await bcrypt.compare(
      input.password,
      user.authorization.password,
    );
    if (isValid) {
      const newToken = v4();
      const updatedUser = await db.Users.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: {
            'authorization.token': newToken,
          },
        },
      );
      return updatedUser.value;
    }
  }
  return null;
};
