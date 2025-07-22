import * as React from "react";

interface LeaderboardComponentProps {
  userName: string;
  userRank: number;
  userTotalScore: number;
  golfCourse: string;
  golfCoursePars: number[];
}

export default function LeaderboardDesktopComponent({
  userName,
  userRank,
  userTotalScore,
  golfCourse,
  golfCoursePars, // Create a golf course total par
}: Readonly<LeaderboardComponentProps>) {
  // Add up the total par for the golf course
  const golfCourseTotalPar = golfCoursePars.reduce((a, b) => a + b, 0);
  // Calculate the distance from par - This is the user's total score minus the total par of the golf course
  const distanceFromPar = userTotalScore - golfCourseTotalPar;
  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased">
            {userRank}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {golfCourse}
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl text-neutral-950 bg-neutral-300 text-left border-l-1 border-neutral-950 subpixel-antialiased">
            {distanceFromPar}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
