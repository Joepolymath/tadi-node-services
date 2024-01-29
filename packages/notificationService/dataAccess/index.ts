import { Document, Model } from 'mongoose';
import DAL from '../../shared/dataAccessLayer';

class NotificationRepo<T extends Document> extends DAL<T> {
  constructor(model: Model<T>) {
    super(model);
  }
}

export default NotificationRepo;
