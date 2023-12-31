import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/sendSuccessResponse';
import { ContactServices } from './contsct.service';

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

export const ContactControllers = {
  createContact,
};
