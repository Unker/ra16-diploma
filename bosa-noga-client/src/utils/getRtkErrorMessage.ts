import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

const getRtkErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
  let errMsg;
  if (error) {
    if ('status' in error) {
      errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    } else {
      errMsg = error.message;
    }
  }
  return errMsg;
};

export default getRtkErrorMessage;
