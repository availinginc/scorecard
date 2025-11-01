import * as React from "react";
import * as Sentry from "@sentry/react";
import { useNavigate, useLocation } from "react-router";
import NavbarComponent from "./components/NavbarComponent";
import CopyrightComponent from "./components/CopyrightComponent";

import { parseJwt } from "./client/Utils";

import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import type { User } from "./types/UserTypes";

export default function App({
  children,
}: Readonly<React.PropsWithChildren<object>>) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, setUser } = useAuth();

  // Handle user
  const handleUser = async () => {
    const obj: User = {};
    if (state) {
      const decodedToken = parseJwt(state?.access_token);
      if (decodedToken) {
        obj.oid = decodedToken?.oid;
        obj.idtyp = decodedToken?.idtyp;
        obj.name = decodedToken?.name;
        obj.given_name = decodedToken?.given_name;
        obj.family_name = decodedToken?.family_name;
        obj.unique_name = decodedToken?.unique_name;
        obj.auth_token = state;
    }
    setUser(obj);
  };

  // Handle redirect
  const handleRedirect = async () => {
    if (window?.location) {
      const domain = window?.location?.toString();
      if (
        !domain?.includes("localhost") &&
        !domain?.includes("https://pinpointscore.golf/")
      ) {
        window.location.replace("https://pinpointscore.golf/");
      }
    }
  };

  // Handle server-side link
  const handleServerSideLink = async () => {
    if (window?.location) {
      const path = window?.location?.pathname?.toString();
      if (path !== "/") {
        navigate(`${path}`);
      }
    }
  };

  React.useEffect(() => {
    const loadHandlers = async () => {
      await handleRedirect();
      await handleServerSideLink();
      await handleUser();
    };
    loadHandlers();
    return () => {};
  }, []);

  // Handle Sentry Initialization
  Sentry.init({
    dsn: "https://bb6199af3206623202735424464e19db@o4509658944438272.ingest.us.sentry.io/4509658951909376",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: false,
  });

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ user, setUser }}>
        <main id="main" className="z-0 max-w-6xl m-9 xl:mx-auto">
          <div className="flex flex-col flex-auto min-w-0 mt-3 px-3 md:px-0">
            <NavbarComponent />
            {children}
            <CopyrightComponent />
          </div>
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}
