import { TestServices } from './test.service';
import { sendSuccessResponse } from '../../utils/sendSuccessResponse';
import { catchAsync } from '../../utils/catchAsync';

// Create test collection controller
const createTestCollection = catchAsync(async (req, res) => {
  // Payload data
  const payload = await req.body;

  // Call test service
  const collection = await TestServices.createTestCollection(payload);

  // Send success response
  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'Test collection created successfully',
    data: collection,
  });
});

// Get all test collection controller
const getCollections = catchAsync(async (req, res) => {
  const collections = await TestServices.getCollections(req.query);
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Test collection fetched successfully',
    data: collections,
  });
});

export const TestControllers = {
  createTestCollection,
  getCollections,
};
