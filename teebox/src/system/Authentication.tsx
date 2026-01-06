import * as React from "react";
import { useLocation } from "react-router";

import { AuthenticationContext } from "../context/AuthenticationProvider";

import type { User } from "../types/UserTypes";

import { parseJwt } from "../client/Utils";
import { getRequest, postRequest } from "../functions/request";
import { endpoints } from "../configurations/constants";

export default function HomePage() {
  const { setUser } = React.useContext(AuthenticationContext);
  const { state } = useLocation();

  // Get User from API
  const getUser = async (userId: string) => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.USER + userId
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting user");
      return error;
    }
  };

  // Save User with API
  const saveUser = async (userData: object) => {
    try {
      const response = await postRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.USER,
        userData
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error saving user");
      return error;
    }
  };

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
      if (state?.access_token) {
        // Get user from login state
        const decodedToken = parseJwt(state.access_token);
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
    const loadAuthentication = async () => {
      const user = getAuthenticatedUser();
      if (user?.oid) {
        // Check for existing user
        const existingUser = await getUser(user.oid);
        if (!existingUser?.id) {
          // Create new user
          await saveUser({
            userId: user.oid,
            userName: user.name,
            userFirstName: user.given_name,
            userLastName: user.family_name,
            userEmail: user.unique_name,
            userCourseId: 0,
            userCourseName: "",
            userHandicap: 0,
            userRank: 0,
          });
        }
        setAuthenticatedUser(user);
      }
    };

    loadAuthentication();

    return () => {};
  }, [state]);

  return <React.Fragment></React.Fragment>;
}
