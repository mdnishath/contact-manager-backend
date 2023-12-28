import { TQueryObj } from '../../interface/TQueryObj';
import { TTest } from './test.interface';
import { Test } from './test.model';
import QueryBuilder from '../../builder/QueryBuilder';

//create test collection
const createTestCollection = async (payload: TTest) => {
  const result = await Test.create(payload);
  return result;
};
// gett all test collections
const getCollections = async (query: TQueryObj) => {
  const courseQuery = new QueryBuilder(Test.find(), query)
    .filter()
    .search()
    .sort()
    .paginate()
    .select();

  const result = await courseQuery.modelQuery;
  return result;
};
export const TestServices = {
  createTestCollection,
  getCollections,
};
