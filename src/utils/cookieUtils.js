import Cookies from "js-cookie";

export const deleteCookie = (cookieName) => {
  Cookies.remove(cookieName);
};

export const isCookieNotExist = (cookieName) => {
  const cookieValue = Cookies.get(cookieName);
  return cookieValue === undefined || cookieValue === null;
};

export const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};
