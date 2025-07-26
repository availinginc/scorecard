import * as React from "react";

import ScorecardComponent from "../components/ScorecardDesktopComponent";
import ScorecardMobileComponent from "../components/ScorecardMobileComponent";

import { getRequest } from "../functions/request";

import initialScorecardData from "../configurations/scorecard.json";
import HeadingOneComponent from "../components/HeadingOneComponent";
import HeadingTwoComponent from "../components/HeadingTwoComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import ParagraphComponent from "../components/ParagraphComponent";
import ScorecardActivitiesComponent from "../components/ScorecardActivitiesComponent";

type ScorecardRow = {
  submitted: string;
  updated: string;
  userId: number;
  userName: string;
  userRank: number;
  userHandicap: number;
  userScores: number[];
  userTotalScore: number;
  golfCourse: string;
  golfCoursePars: number[];
  golfCourseTotalPar: number;
  golfCourseHolesPlayed: number;
};

export default function ScorecardPage() {
  const [scorecards, setScorecards] = React.useState<ScorecardRow[]>([]);

  // Handle scorecards
  const handleScorecards = async () => {
    try {
      // Request initial
      const initial = initialScorecardData;

      // Set initial leaderboard
      if (initial?.length > 0) {
        setScorecards(initial);
      }

      // Set base url
      const base = import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "";

      // Request response
      const response = await getRequest(base, `/leaderboard/`);
      if (initial?.length > 0 && response?.length > 0) {
        // Create leaderboard rows
        response.forEach((item: ScorecardRow, index: number) => {
          // Create temporary row
          const row: ScorecardRow = {
            ...item,
          };

          // Update row if less than or equal to 10 or add a new row if greater than 10 rows
          if (initial?.[index]) {
            initial[index] = row;
          } else {
            initial.push(row);
          }
        });
      }

      // Sort the leaderboard by userRank
      const sorted = initial.slice().sort((a, b) => a.userRank - b.userRank);
      if (sorted?.length > 0) {
        // Set the leaderboard
        setScorecards(sorted);
      } else if (initial?.length > 0) {
        // Set the placeholder leaderboard
        setScorecards(initial);
      }
    } catch (error) {
      console.error("Error loading leaderboard");
      return error;
    }
  };

  React.useEffect(() => {
    const loadScorecard = async () => {
      await handleScorecards();
    };
    loadScorecard();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text="Scorecard" />
        <IntroductionComponent text="Add your scores and track your season progress by submitting your scorecard!" />
      </section>
      <section className="invisible lg:visible hidden lg:block my-3">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Total
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
              +
            </li>
          </ul>
        </div>
        {scorecards?.length > 0 ? (
          scorecards.map((item, index) => (
            <ScorecardComponent
              key={`scorecard-${item?.userId}-${index}`}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCoursePars={item?.golfCoursePars}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-3 border-1 border-neutral-950">
        {scorecards?.length > 0 ? (
          scorecards.map((item, index) => (
            <ScorecardMobileComponent
              key={`scorecard-${item?.userId}-${index}`}
              userName={item?.userName}
              userRank={item?.userRank}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCoursePars={item?.golfCoursePars}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="active my-3 border-1 border-neutral-950">
        <div className="my-3">
          <HeadingTwoComponent text="Scorecard activities" />
          <ParagraphComponent text="Manage your scorecards effectively by using the options below." />
        </div>
        <ScorecardActivitiesComponent />
      </section>
    </React.Fragment>
  );
}
