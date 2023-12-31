import { JwtPayload } from 'jsonwebtoken';
import { TContact } from './contact.interface';
import { Contact } from './contact.model';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { TQueryObj } from '../../interface/TQueryObj';
import mongoose, { Types } from 'mongoose';

//create contact
const createContact = async (userData: JwtPayload, payload: TContact): Promise<TContact | null> => {
  const user = await User.findById(userData.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  const result = (await Contact.create({ ...payload, createdBy: user.id })).populate('createdBy');
  return result;
};

//get contacts
const getContacts = async (userData: JwtPayload, query: TQueryObj) => {
  const user = await User.findById(userData.id);
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

// update contact
const updateContact = async (
  userData: JwtPayload,
  payload: Partial<TContact>,
  id: Types.ObjectId,
): Promise<TContact | null> => {
  const user = await User.findById(userData.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  const createdBy = new mongoose.Types.ObjectId(userData.id);
  // console.log(createdBy, id);
  const exactUser = await Contact.findOne({ _id: id, createdBy });

  if (!exactUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const { name, ...remainingContactData } = payload || {};
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingContactData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  // console.log(modifiedUpdatedData, user._id);

  const updatedContact = await Contact.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return updatedContact;
};
export const ContactServices = {
  createContact,
  getContacts,
  updateContact,
};
