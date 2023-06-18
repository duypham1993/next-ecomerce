export const getLocalAccessToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
};

export const updateLocalAccessToken = (token) => {
  localStorage.setItem("accessToken", JSON.stringify(token));
};

export const getLocalCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const updateLocalCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const clearLocalStorage = () => {
  localStorage.clear();
  window.dispatchEvent(new Event("storage"));
};
