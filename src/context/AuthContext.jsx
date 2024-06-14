// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // after hosting
//         await axios.get("https://mern-authentication-backend-lzc7.onrender.com/auth/user/check",
//         // for localhost
//         // await axios.get("http://localhost:8000/auth/user/check",
//         {
//           withCredentials: true,
//         });
//         setIsAuthenticated(true);
//       } catch (error) {
//         setIsAuthenticated(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

////////////////////////////////////////////////////////////////

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const baseURL =
        window.location.hostname === "localhost"
          ? "http://localhost:8000"
          : "https://mern-authentication-backend-lzc7.onrender.com";

      try {
        const response = await axios.get(`${baseURL}/auth/user/check`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated); 
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
