import { JwtPayload } from 'jsonwebtoken';
import { TContact } from './contact.interface';
import { Contact } from './contact.model';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

//create contact
const createContact = async (userData: JwtPayload, payload: TContact): Promise<TContact | null> => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  const result = (await Contact.create({ ...payload, createdBy: user.id })).populate('createdBy');
  return result;
};

export const ContactServices = {
  createContact,
};
