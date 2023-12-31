import { JwtPayload } from 'jsonwebtoken';
import { TContact } from './contact.interface';
import { Contact } from './contact.model';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { TQueryObj } from '../../interface/TQueryObj';

//create contact
const createContact = async (userData: JwtPayload, payload: TContact): Promise<TContact | null> => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  const result = (await Contact.create({ ...payload, createdBy: user.id })).populate('createdBy');
  return result;
};

//get contacts
const getContacts = async (userData: JwtPayload, query: TQueryObj) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  const contactQuery = new QueryBuilder(Contact.find().populate('createdBy'), query)
    .filter()
    .search()
    .sort()
    .paginate()
    .select();
  const result = await contactQuery.modelQuery;
  return result;
};
export const ContactServices = {
  createContact,
  getContacts,
};
