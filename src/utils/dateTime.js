const formatDateTime = () => {
  const now = new Date();
  const yearNow = now.getFullYear();
  const monthNow = ("0" + (now.getMonth() + 1)).slice(-2);
  const dateNow = ("0" + now.getDate()).slice(-2);
  const hourNow = ("0" + now.getHours()).slice(-2);
  const minuteNow = ("0" + now.getMinutes()).slice(-2);
  return { yearNow, monthNow, dateNow, hourNow, minuteNow };
};
const formatDate = (objectDate) => {
  const dateObject = new Date(objectDate);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfWeek = days[dateObject.getDay()];
  const dayOfMonth = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  const formattedDate =
    dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
  return formattedDate;
};
export { formatDateTime, formatDate };
