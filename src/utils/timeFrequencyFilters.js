export const filterDaily = (items) => {
  const today = new Date();
  return items.filter((item) => {
    const itemDate = new Date(item.date_created);
    return itemDate.toDateString() === today.toDateString();
  });
};

export const filterWeekly = (items) => {
  const today = new Date();
  const startOfWeek = new Date(
    new Date().setDate(today.getDate() - today.getDay())
  );
  return items.filter((item) => {
    const itemDate = new Date(item.date_created);
    return itemDate >= startOfWeek && itemDate <= today;
  });
};

export const filterQuarterly = (items) => {
  const today = new Date();
  const currentQuarter = Math.floor((today.getMonth() + 3) / 3);
  const startOfQuarter = new Date(
    today.getFullYear(),
    (currentQuarter - 1) * 3,
    1
  );
  return items.filter((item) => {
    const itemDate = new Date(item.date_created);
    return itemDate >= startOfQuarter && itemDate <= today;
  });
};

export const filterAnnually = (items) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  return items.filter((item) => {
    const itemDate = new Date(item.date_created);
    return itemDate >= startOfYear && itemDate <= today;
  });
};
