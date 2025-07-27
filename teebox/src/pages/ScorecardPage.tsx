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

import type { Scorecard } from "../types/ScorecardTypes";

export default function ScorecardPage() {
  const [scorecards, setScorecards] = React.useState<Scorecard[]>([]);
  const handleScorecards = async () => {
    try {
      const initial = initialScorecardData as Scorecard[];
      if (initial?.length > 0) {
        setScorecards(initial);
      }
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        `/leaderboard/`,
      );
      if (response?.length > 0) {
        response.forEach((item: Scorecard, index: number) => {
          const scorecard: Scorecard = {
            ...item,
          };
          if (initial?.[index]) {
            initial[index] = scorecard;
          } else {
            initial.push(scorecard);
          }
        });
      }
      const sorted = initial
        .slice()
        .sort((a, b) => (a?.userRank ?? 0) - (b?.userRank ?? 0));
      if (sorted?.length > 0) {
        setScorecards(sorted);
      } else if (initial?.length > 0) {
        setScorecards(initial);
      }
    } catch (error) {
      console.error("Error loading leaderboard");
      return error;
    }
  };
  const handleSubmitScorecard = async (values: Scorecard) => {
    console.log("Adding new scorecard with values:", values);
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
        <HeadingOneComponent text=" Scorecard" />
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
        {Array?.isArray(scorecards) && scorecards?.length > 0 ? (
          scorecards?.map((item, index) => (
            <ScorecardComponent
              key={`scorecard-${item?.userId}-${index}`}
              userScores={item?.userScores}
              userTotalScore={item?.userTotalScore}
              golfCourse={item?.golfCourse}
              golfCoursePars={item?.golfCoursePars}
              updated={""}
              userId={0}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-3 border-1 border-neutral-950">
        {Array?.isArray(scorecards) && scorecards?.length > 0 ? (
          scorecards?.map((item, index) => (
            <ScorecardMobileComponent
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
      <section className="active my-3 border-1 border-neutral-950">
        <div className="my-3">
          <HeadingTwoComponent text=" Scorecard activities" />
          <ParagraphComponent text="Manage your scorecards effectively by using the options below." />
        </div>
        <ScorecardActivitiesComponent
          scorecards={scorecards}
          handleSubmitScorecard={handleSubmitScorecard}
        />
      </section>
    </React.Fragment>
  );
}
