import { Document, Model } from 'mongoose';
import DAL from '../../shared/dataAccessLayer';

class UserRepo<T extends Document> extends DAL<T> {
  constructor(model: Model<T>) {
    super(model);
  }
}

export default UserRepo;
