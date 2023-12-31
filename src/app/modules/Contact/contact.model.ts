import { Schema, model } from 'mongoose';
import { TContact, TName } from './contact.interface';

export const nameSchema = new Schema<TName>({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

export const contactSchema = new Schema<TContact>(
  {
    name: nameSchema,
    email: { type: String, trim: true, required: true, unique: true },
    phone: { type: String, trim: true, required: true, unique: true },
    country: { type: String, trim: true, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

export const Contact = model<TContact>('Contact', contactSchema);
