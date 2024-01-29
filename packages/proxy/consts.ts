import {
  USER_SERVICE_URL,
  NOTIFICATION_SERVICE_URL,
} from '../shared/configs/env.config';

export const magicValues = {
  USER_SERVICE_URL: USER_SERVICE_URL || '',
  NOTIFICATION_SERVICE_URL: NOTIFICATION_SERVICE_URL || '',
};

export const Routes = {
  USER_SERVICE: magicValues.USER_SERVICE_URL,
  NOTIFICATION_SERVICE: magicValues.NOTIFICATION_SERVICE_URL,
};
