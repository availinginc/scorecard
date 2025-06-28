import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="mb-16">
      <ul className="flex flex-row space-x-6 md:space-x-9 space-y-0 mx-auto mt-3 font-sm">
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" to="/">
            <img alt="Pin Point Score" src="/pinpointscore.svg" />
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" to="/">
            Home
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" to="/about">
            About
          </Link>
        </li>
        <li className="flex items-center self-center justify-self-end ml-auto transition-all button py-3 px-3 md:px-9">
          <Link rel="noopener noreferrer" target="_self" to="/signup">
            Sign Up
          </Link>
        </li>
        {false ? (
          <li className="flex items-center self-center justify-self-end transition-all button-alt py-3 px-3 md:px-9">
            <Link rel="noopener noreferrer" target="_self" to="/">
              Sign Out
            </Link>
          </li>
        ) : (
          <li className="flex items-center self-center justify-self-end transition-all button-alt py-3 px-3 md:px-9">
            <Link rel="noopener noreferrer" target="_self" to="/signin">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
