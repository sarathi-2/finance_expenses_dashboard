import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("fintrackUser");

    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem("fintrackUser");
      }
    }

    return null;
  });

  const login = (email, password) => {
    const loggedUser = {
      name: email || "Admin",
      email: email || "admin@gmail.com",
    };

    localStorage.setItem(
      "fintrackUser",
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);

    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      name: name || "Admin",
      email: email || "admin@gmail.com",
    };

    localStorage.setItem(
      "fintrackUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("fintrackUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}