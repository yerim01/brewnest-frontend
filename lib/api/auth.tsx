"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "@/lib/tokens";
import { useUserProfileStore } from "@/stores/userProfileStore";

const { fetchUserProfile } = useUserProfileStore.getState();

interface DecodedUser {
  username: string;
  exp: number; // expiration time in seconds
  // iat: number; // issued at (optional)
  [key: string]: any; // for other fields like `id`, `email` etc.
}

interface AuthContextType {
  isAuthorized: boolean;
  user: DecodedUser | null;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthorized: false,
  user: null,
  login: async () => false,
  logout: () => {},
  refreshToken: async () => false,
});

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<DecodedUser | null>(null);

  // Function to check and validate token
  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

    if (token) {
      try {
        const decoded = jwtDecode<DecodedUser>(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          // Token expired, try to refresh
          await refreshToken();
        } else {
          // Token is valid
          console.log(jwtDecode(token));
          setIsAuthorized(true);
          setUser(decoded);
        }
      } catch (error) {
        // Invalid token
        logout();
      }
    } else if (googleAccessToken) {
      try {
        const isValid = await validateGoogleToken(googleAccessToken);
        if (isValid) {
          setIsAuthorized(true);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    } else {
      logout();
    }
  };

  // Refresh token method
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/accounts/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        const decoded = jwtDecode<DecodedUser>(res.data.access);
        setIsAuthorized(true);
        setUser(decoded);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
    }
    return false;
  };

  // Validate Google token
  const validateGoogleToken = async (
    googleAccessToken: string
  ): Promise<boolean> => {
    try {
      const res = await api.post("/accounts/google/validate_token/", {
        access_token: googleAccessToken,
      });
      return res.data.valid;
    } catch (error) {
      console.error("Google token validation failed", error);
      return false;
    }
  };

  // Get username and email
  // const fetchUserProfile = async () => {
  //   try {
  //     const res = await api.get("/accounts/auth/user/");
  //     setUser({
  //       username: res.data.username,
  //       email: res.data.email,
  //       ...res.data,
  //     });
  //     console.log("username: " + user?.username);
  //   } catch (error) {
  //     console.error("Failed to fetch user profile", error);
  //   }
  // };

  // Login method
  const login = async (credentials: {
    username?: string;
    password?: string;
    google_token?: string;
  }): Promise<boolean> => {
    try {
      let res;
      if (credentials.google_token) {
        // Google login
        res = await api.post("/accounts/google/validate_token/", {
          access_token: credentials.google_token,
        });
      } else {
        // Regular login
        res = await api.post("/accounts/token/", credentials);
      }

      localStorage.setItem(ACCESS_TOKEN, res.data.access);

      // For regular login, also store refresh token
      if (res.data.refresh) {
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      }

      // Fetch profile
      await fetchUserProfile();

      // Trigger auth check
      await checkAuth();
      return true;
    } catch (error) {
      console.error("Login failed", error);

      return false;
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    setIsAuthorized(false);
    setUser(null);
  };

  // Check auth on mount and set up token refresh interval
  useEffect(() => {
    checkAuth();

    // Set up an interval to check and refresh token periodically
    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        user,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
