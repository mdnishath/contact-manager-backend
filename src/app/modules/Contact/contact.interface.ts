import { Document, Types } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};
export interface TContact extends Document {
  name: TName;
  email: string;
  phone: string;
  country: string;
  createdBy: Types.ObjectId;
}
