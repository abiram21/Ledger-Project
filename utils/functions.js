// Utils functions are defined here (Commonly used functions)

//Define the way of the response for success
exports.sucessRes = function (data) {
  return {
    isError: false,
    result: data
   
  };
};

//Define the way of the error response
exports.errorRes = function (error) {
  return {
    isError: true,
    error: error
  };
};