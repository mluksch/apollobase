import { ObjectId } from 'mongodb';

export type ICat = {
  _id: ObjectId;
  name: string;
  bestFriend?: ObjectId | null;
};
