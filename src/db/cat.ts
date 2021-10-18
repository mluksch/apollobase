import { ObjectId } from 'mongodb';

export type ICat = {
  _id: ObjectId;
  name: string;
  bestFriend?: ObjectId | null;
  gender: Gender;
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
