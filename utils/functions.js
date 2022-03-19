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

exports.findDays = function(frequency) {
switch(frequency) {
  case "WEEKLY":
    return 7;
    break;
  case "FORTNIGHTLY":
    return 14;
    break;
}
}

//add certain no.of days to a date
exports.addDays = function(dateStr, days) {
  var outDate = new Date(dateStr);
  outDate.setDate(outDate.getDate() + parseInt(days));
  return outDate;
}

// change format according to response
exports.changeFormat = function(date) {
  year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  dt = date.getDate();
  return month+" "+dt+", "+year;
}