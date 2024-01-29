import mongoose from 'mongoose';
import Bluebird from 'bluebird';

import { DB_URI } from '../../shared/configs/env.config';

export const connectDb = function () {
  let db;

  mongoose.Promise = Bluebird;

  const options = {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
  };

  mongoose.connect(DB_URI, options);
  db = mongoose.connection;
  db.on('error', (err) => {
    console.error('Error connecting to database.'.red, err);
  });
  db.once('connected', () => {
    console.log('Database Connection is Successful'.blue.bold);
  });
  db.once('disconnected', () => {
    console.info('Database Disconnected');
  });
};
