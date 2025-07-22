import * as React from "react";

interface LeaderboardComponentProps {
  userName: string;
  userRank: number;
  userTotalScore: number;
  golfCourse: string;
  golfCoursePars: number[];
}

export default function LeaderboardMobileComponent({
  userName,
  userRank,
  userTotalScore,
  golfCourse,
  golfCoursePars, // Create a golf course total
}: Readonly<LeaderboardComponentProps>) {
  // Add up the total par for the golf course
  const golfCourseTotalPar = golfCoursePars.reduce((a, b) => a + b, 0);
  // Calculate the distance from par - This is the user's total score minus the total par of the golf course
  const distanceFromPar = userTotalScore - golfCourseTotalPar;
  return (
    <React.Fragment>
      <div className="border-1 border-neutral-950">
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Rank
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {userRank}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Username
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {userName}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Course
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {golfCourse}
          </li>
        </ul>
        <ul className="flex flex-row flex-auto justify-center content-evenly items-stretch">
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base font-bold text-neutral-950 bg-lime-600 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            Total
          </li>
          <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[50%] max-w-[50%] p-3 text-base text-neutral-950 bg-neutral-300 text-left border-b-1 border-neutral-950 subpixel-antialiased">
            {distanceFromPar}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
