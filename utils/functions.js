// Utils functions are defined here (Commonly used functions)

//Define the way of the response for success
exports.sucessRes = function (data) {
  return {
    isError: false,
    result: data,
  };
};

//Define the way of the error response
exports.errorRes = function (error) {
  return {
    isError: true,
    error: error,
  };
};

exports.findDays = function (frequency) {
  switch (frequency) {
    case "WEEKLY":
      return 7;
    case "FORTNIGHTLY":
      return 14;
  }
};

//add certain no.of days to a date
exports.addDays = function (dateStr, days) {
  var outDate = new Date(dateStr);
  outDate.setDate(outDate.getDate() + parseInt(days));
  return outDate;
};

// Find the last day of a given month and year
exports.lastDayOfMonth = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};

// change format according to response
exports.changeFormat = function (date) {
  year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  dt = date.getDate();
  suffix = findDateSuffix(dt);
  return month + " " + dt + suffix + ", " + year;
};

//adding suffix according to the date last digit
function findDateSuffix(date) {
  let dateStr = date % 10; // to find the last digit

  return digitSuffix(dateStr);
}

//define the suffix
function digitSuffix(val) {
  switch (val) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
exports.toTwoDecimal = function (num) {
  return +(Math.round(num + "e+2") + "e-2");
};
