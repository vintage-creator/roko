export const setUserDataWithExpiry = (userData, expiresInHours) => {
  const expiryTime = new Date();
  expiryTime.setTime(expiryTime.getTime() + expiresInHours * 60 * 60 * 1000);

  const userDataWithExpiry = {
    ...userData,
    expires: expiryTime.getTime(),
  };

  sessionStorage.setItem("user", JSON.stringify(userDataWithExpiry));
};
