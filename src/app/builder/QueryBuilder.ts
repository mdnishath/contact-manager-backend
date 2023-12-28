import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  //filter query
  filter() {
    const queryObject = { ...this.query };
    // Get the list of field names from the model schema
    const schemaFields = Object.keys(this.modelQuery.model.schema.paths);
    console.log(queryObject, schemaFields);

    // Exclude fields that are not present in the schema
    Object.keys(queryObject).forEach((field) => {
      if (!schemaFields.includes(field)) {
        delete queryObject[field];
      }
    });
    console.log(queryObject);

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }
  search() {
    if (this.query?.searchTerm) {
      const fieldValues = Object.values(this.modelQuery.model.schema.paths);
      const searchableFields = fieldValues
        .filter((fieldObj) => {
          if (fieldObj.instance === 'String') {
            return true;
          }
        })
        .map(
          (fieldObj) =>
            ({
              [fieldObj.path]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        );
      console.log(searchableFields);

      this.modelQuery = this.modelQuery.find({
        $or: searchableFields,
      });
    }

    return this;
  }
  sort() {
    if (this.query.sortBy && this.query.sortOrder) {
      const sortBy = this.query.sortBy; //"price" | "duration" | "ratingsAverage"
      const sortOrder = this.query.sortOrder; //"asc" | "desc"
      const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery.sort(sortStr);
    }

    return this;
  }
  paginate() {
    if (this.query?.page || this.query?.limit) {
      const page = Number(this.query?.page) || 1;
      const limit = Number(this.query?.limit) || 10;
      const skip = (page - 1) * limit;
      this.modelQuery.skip(skip).limit(limit);
      // Tour.find().skip(10).limit(10)
    } else {
      this.modelQuery.skip(0).limit(10);
    }

    return this;
  }
  select() {
    const _fields = this.query?.fields as string;
    if (_fields) {
      const fields = _fields.split(',').join(' ');
      this.modelQuery.select(fields);
    }

    return this;
  }
}

export default QueryBuilder;
