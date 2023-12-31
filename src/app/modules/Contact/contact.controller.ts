import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/sendSuccessResponse';
import { ContactServices } from './contsct.service';
import mongoose from 'mongoose';

//create contact
const createContact = catchAsync(async (req, res) => {
  const payload = await req.body;
  const userData = req.user;
  //call service
  const result = await ContactServices.createContact(userData, payload);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Contact created successfully',
    data: result,
  });
});

//get contacts
const getContacts = catchAsync(async (req, res) => {
  const userData = req.user;
  const query = req.query;
  //call service
  const result = await ContactServices.getContacts(userData, query);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contacts retrived successfully',
    data: result,
  });
});

const updateContact = catchAsync(async (req, res) => {
  const payload = await req.body;
  const userData = req.user;
  const id = new mongoose.Types.ObjectId(req.params.id);

  // call service
  const result = await ContactServices.updateContact(userData, payload, id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact updated succesfully',
    data: result,
  });
});

export const ContactControllers = {
  createContact,
  getContacts,
  updateContact,
};
