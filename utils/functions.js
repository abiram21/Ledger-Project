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
  suffix = findDateSuffix(dt);

  return month+" "+dt+suffix+", "+year;


}

//adding suffix according to the date last digit
function findDateSuffix(date){
  let dateStr = date%10; // to find the last digit
    
  return digitSuffix(dateStr);
}

//define the suffix
function digitSuffix(val) {
switch(val) {
  case 1:
    return "st";
    break;
  case 2:
    return "nd";
    break;
  case 3:
    return "rd";
    break;
  default:
    return "th";
  }
}