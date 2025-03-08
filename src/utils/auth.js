// Simple utility to access auth information from environment variables
export const getAuthInfo = () => {
  return {
    token: process.env.REACT_APP_TOKEN || localStorage.getItem("token"),
    role: process.env.REACT_APP_ROLE || localStorage.getItem("role"),
    isAuthenticated: !!(
      process.env.REACT_APP_TOKEN || localStorage.getItem("token")
    ),
  };
};

// Helper function to check if user is a mentor
export const isMentor = () => {
  const { role } = getAuthInfo();
  return role === "mentor";
};

// Helper function to get auth headers for API requests
export const getAuthHeaders = () => {
  const { token } = getAuthInfo();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
