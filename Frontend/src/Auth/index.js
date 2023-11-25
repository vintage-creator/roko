// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const userData = sessionStorage.getItem("user");

  if (userData) {
    try {
      const user = JSON.parse(userData);

      if (user && user.token && user.expires) {
        const currentTime = new Date().getTime();

        // Check if the token is not expired
        return currentTime < user.expires;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  return false;
};

