import * as React from "react";
import { useLocation } from "react-router";

import { AuthenticationContext } from "../context/AuthenticationProvider";

import type { User } from "../types/UserTypes";

import { parseJwt } from "../client/Utils";

export default function HomePage() {
  const { setUser } = React.useContext(AuthenticationContext);
  const { state } = useLocation();

  // Get user
  const getAuthenticatedUser = (): User | null => {
    try {
      // Get user from local storage
      const storageUser = localStorage.getItem("user");
      if (storageUser) {
        const decodedToken = JSON.parse(storageUser) as User;
        if (Object.keys(decodedToken)?.length > 0) {
          return decodedToken;
        }
      }
      // Get user from login state
      const decodedToken = parseJwt(state.access_token);
      if (state?.access_token) {
        if (decodedToken) {
          return {
            oid: decodedToken.oid,
            idtyp: decodedToken.idtyp,
            name: decodedToken.name,
            given_name: decodedToken.given_name,
            family_name: decodedToken.family_name,
            unique_name: decodedToken.unique_name,
          };
        }
      }
      return null;
    } catch {
      console.error("Error getting user from storage or token");
      return null;
    }
  };

  // Set user to local storage and context (sync)
  const setAuthenticatedUser = (userToSet: User) => {
    try {
      localStorage.setItem("user", JSON.stringify(userToSet));
      setUser(userToSet);
    } catch {
      console.error("Error setting user");
    }
  };

  // // Remove user from local storage and context
  // const removeAuthenticatedUser = () => {
  //   try {
  //     localStorage.removeItem("user");
  //     setUser(null);
  //   } catch {
  //     console.error("Error removing user");
  //   }
  // };

  React.useEffect(() => {
    const loadAuthentication = () => {
      const user = getAuthenticatedUser();
      if (user) setAuthenticatedUser(user);
    };

    loadAuthentication();

    return () => {};
  }, [state]);

  return <React.Fragment></React.Fragment>;
}
