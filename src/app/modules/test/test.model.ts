import { Schema, model } from 'mongoose';
import { TTest } from './test.interface';

const testSchema = new Schema<TTest>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Test = model<TTest>('Test', testSchema);
