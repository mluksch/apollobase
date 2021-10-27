import { connectToDb } from '@models/index';
import { LogoutInput } from '@generated/graphql';

export const logoutUser = async (input: LogoutInput) => {
  const { Users } = await connectToDb();
  const result = await Users.findOneAndUpdate(
    {
      email: input.email,
    },
    {
      $set: {
        'authorization.token': null,
      },
    },
  );
  return result.value;
};
