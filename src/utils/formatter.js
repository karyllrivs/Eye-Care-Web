export const convertTo24HourFormat = (timeStr) => {
  // Extract the parts of the time string
  const [time, modifier] = timeStr.split(" ");

  let [hours, minutes] = time.split(":");

  hours = parseInt(hours, 10);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatTimeToAMPM = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  let hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);
  const ampm = hoursInt >= 12 ? "PM" : "AM";
  hoursInt = hoursInt % 12 || 12; // Convert hour '0' to '12'
  const formattedTime = `${hoursInt}:${
    minutesInt < 10 ? "0" + minutesInt : minutesInt
  } ${ampm}`;
  return formattedTime;
};

// format yyyy-MM-dd to dd/mm/yyyy
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const formatDateToLong = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// format dd/mm/yyyy to yyyy-MM-dd
export const convertDate = (inputDate) => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = inputDate.match(datePattern);

  if (!match) return inputDate;

  const [month, day, year] = inputDate.split("/");
  return `${year}-${month}-${day}`;
};
