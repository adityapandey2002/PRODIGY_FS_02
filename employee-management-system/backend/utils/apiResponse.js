class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

const sendResponse = (res, statusCode, data, message) => {
  const response = new ApiResponse(statusCode, data, message);
  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
    statusCode
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  return sendResponse(res, statusCode, data, message);
};

module.exports = {
  ApiResponse,
  sendResponse,
  sendError,
  sendSuccess
};
