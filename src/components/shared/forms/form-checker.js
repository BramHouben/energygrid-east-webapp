export const FormHours = (dateFrom, hours) => {
  let dates = [];
  let date = new Date(dateFrom);
  for (var i = 0; i <= parseInt(hours); i++) {
    let newDate = new Date(date.valueOf() + i * 1000 * 60 * 60);
    let formattedTime = FormattedDate(newDate);
    dates.push(formattedTime);
  }

  return dates;
};

export const FormattedDate = (date) => {
  let newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  let day = ("0" + newDate.getDate()).slice(-2);
  let hours = "0" + newDate.getHours();
  let minutes = "0" + newDate.getMinutes();

  return (
    year +
    "-" +
    month +
    "-" +
    day +
    "T" +
    hours.substr(-2) +
    ":" +
    minutes.substr(-2)
  );
};
