import * as React from "react";

import LeaderboardDesktopComponent from "../components/LeaderboardDesktopComponent";
import LeaderboardMobileComponent from "../components/LeaderboardMobileComponent";

import { getRequest } from "../functions/request";

import initialLeaderboardData from "../configurations/leaderboard.json";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

import type { Leaderboard } from "../types/LeaderboardTypes";

export default function LeaderboardPage() {
  const [rankings, setRankings] = React.useState<Leaderboard[]>([]);
  const handleRankings = async () => {
    try {
      const initial = initialLeaderboardData as Leaderboard[];
      if (initial?.length > 0) {
        setRankings(initial);
      }
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        `/leaderboard/`
      );
      if (response?.length > 0) {
        response.forEach((item: Leaderboard, index: number) => {
          if (initial?.[index]) {
            initial[index] = item;
          } else {
            initial.push(item);
          }
        });
      }
      const sorted = initial
        .slice()
        .sort((a, b) => (a?.userRank ?? 0) - (b?.userRank ?? 0));
      if (sorted?.length > 0) {
        setRankings(sorted);
      } else if (initial?.length > 0) {
        setRankings(initial);
      }
    } catch (error) {
      console.error("Error loading leaderboard");
      return error;
    }
  };
  React.useEffect(() => {
    const loadLeaderboard = async () => {
      await handleRankings();
    };
    loadLeaderboard();
    return () => {};
  }, []);
  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text="Leaderboard" />
        <IntroductionComponent text="Our leaderboard displays the top users based on their scores. Check out the rankings and see how you stack up against others!" />
      </section>
      <section className="invisible lg:visible hidden lg:block">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left subpixel-antialiased">
              Rank
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Username
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/4] max-w-[1/4] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Total
            </li>
          </ul>
        </div>
        {rankings?.length > 0 ? (
          rankings.map((item, index) => (
            <LeaderboardDesktopComponent
              key={`leaderboard-${item?.userName}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCourseTotalPar={item?.golfCourseTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-1 border-1 border-neutral-950">
        {rankings?.length > 0 ? (
          rankings.map((item, index) => (
            <LeaderboardMobileComponent
              key={`leaderboard-${item?.userName}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCourseTotalPar={item?.golfCourseTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}
