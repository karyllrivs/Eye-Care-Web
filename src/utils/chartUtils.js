export const getMonths = [
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

export const placeCustomersOnMonth = (customers) => {
  return getMonths.map((_, index) => {
    const monthCustomers = customers.find((item) => item._id === index + 1);
    return monthCustomers ? monthCustomers.count : 0;
  });
};

export const placeSalesOnMonth = (sales) => {
  return getMonths.map((_, index) => {
    const monthSales = sales.find((item) => item._id === index + 1);
    return monthSales ? monthSales.total : 0;
  });
};

export const placePatientsOnMonth = (patients) => {
  return getMonths.map((_, index) => {
    const monthPatients = patients.find((item) => item._id === index + 1);
    return monthPatients ? monthPatients.count : 0;
  });
};
