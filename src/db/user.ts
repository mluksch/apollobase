import { ObjectId } from 'mongodb';

export type IUser = {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
};
