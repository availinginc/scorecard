"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import Logo from "@/components/custom/Logo";

const login = (e) => {
  e.preventDefault();
  window.location.href = "/login";
};

const logout = (e) => {
  e.preventDefault();
  window.location.href = "/";
};

export default function Navbar() {
  return (
    <nav className="mb-16">
      <ul className="flex flex-row space-x-6 md:space-x-9 space-y-0 mx-auto mt-3 font-sm">
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/">
            <Logo />
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/">
            Home
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/about">
            About
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/leaderboard">
            Leaderboard
          </Link>
        </li>
        <li className="flex items-center self-center justify-self-end ml-auto transition-all">
          <Button className="button py-3 px-3 md:px-9" variant="outline">
            Get Started
          </Button>
        </li>
        {false ? (
          <li className="flex items-center self-center justify-self-end transition-all">
            <Button
              className="button-alt py-3 px-3 md:px-9"
              variant="outline"
              onClick={(e) => logout(e)}
            >
              Log out
            </Button>
          </li>
        ) : (
          <li className="flex items-center self-center justify-self-end transition-all">
            <Button
              className="button-alt py-3 px-3 md:px-9"
              variant="outline"
              onClick={(e) => login(e)}
            >
              Login
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
