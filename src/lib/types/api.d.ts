declare type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

declare type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};


declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;