import httpStatus from 'http-status';

const serverResponseStatus = {
  RESPONSE_STATUS_FAILURE: 'failure',
  RESPONSE_STATUS_SUCCESS: 'success',
  OK: httpStatus.OK,
  INTERNAL_SERVER_ERROR: httpStatus.INTERNAL_SERVER_ERROR,
  NOT_FOUND: httpStatus.NOT_FOUND,
  FAILED: httpStatus.BAD_REQUEST,
  BAD_REQUEST: httpStatus.BAD_REQUEST,
};

export default serverResponseStatus;
