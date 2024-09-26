export const makeEnum = (arr) => {
  let obj = Object.create(null);
  for (let val of arr) {
    obj[val] = val;
  }
  return Object.freeze(obj);
};
