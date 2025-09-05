import * as React from "react";

import { NavLink } from "react-router";

import type { Scorecard } from "../types/ScorecardTypes";

export default function ScorecardDesktopComponent({
  golfCourseName,
  golfCoursePars,
  golfCourseTotalPar,
}: Readonly<Scorecard>) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {golfCourseName}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {golfCourseTotalPar}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            <NavLink
              className="transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="#"
              onClick={() => handleExpand()}
            >
              Parcard
            </NavLink>
          </li>
        </ul>
      </div>
      {expand ? (
        <React.Fragment>
          <div className="border-1 border-neutral-950">
            <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-neutral-950 subpixel-antialiased">
                Hole
              </li>
              {golfCoursePars?.map((item, index) => (
                <li
                  key={`hole-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {index + 1}
                </li>
              ))}
            </ul>
            <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
              <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[10%] max-w-[10%] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 text-left border-neutral-950 subpixel-antialiased">
                Par
              </li>
              {golfCoursePars?.map((item, index) => (
                <li
                  key={`hole-${item}-${index}`}
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[5%] max-w-[5%] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 text-center border-l-1 border-neutral-950 subpixel-antialiased"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
