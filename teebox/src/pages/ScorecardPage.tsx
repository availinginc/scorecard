import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import HeadingTwoComponent from "../components/HeadingTwoComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import ParagraphComponent from "../components/ParagraphComponent";
import ScorecardComponent from "../components/ScorecardDesktopComponent";
import ScorecardMobileComponent from "../components/ScorecardMobileComponent";
import ScorecardActivitiesComponent from "../components/ScorecardActivitiesComponent";

import type { Scorecard } from "../types/ScorecardTypes";
import { endpoints } from "../configurations/constants";
import initialScorecardData from "../configurations/scorecard.json";

import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../functions/request";

export default function ScorecardPage() {
  const [scorecards, setScorecards] = React.useState<Scorecard[]>([]);

  const handleSubmitScorecard = async (
    activity: string,
    userId: number,
    userScores?: Scorecard,
    golfCourseId?: number
  ) => {
    try {
      console.log("Adding new scorecard with activity:", activity);
      console.log("Adding new scorecard with userScores:", userScores);
      console.log("Adding new scorecard with golfCourseId:", golfCourseId);
      if (activity === "add") {
        // Handle adding a new scorecard
        const response = await postRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.SCORECARD,
          {
            userId: userId,
            userScores: userScores,
            golfCourseId: golfCourseId,
          }
        );
        if (response) {
          // Handle successful response
          console.log("Scorecard added successfully");
        }
      } else if (activity === "update ") {
        // Handle adding a new scorecard
        const response = await patchRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.SCORECARD,
          {}
        );
        if (response) {
          console.log("Scorecard updated successfully");
        }
      } else if (activity === "delete") {
        // Handle deleting a scorecard
        const response = await deleteRequest(
          import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
          endpoints.SCORECARD + userId,
          {}
        );
        if (response) {
          console.log("Scorecard deleted successfully");
        }
      }
    } catch (error) {
      console.error("Error performing activity on scorecard");
      return error;
    }
  };

  const handleLoadScorecards = async () => {
    try {
      const initial = initialScorecardData as Scorecard[];
      if (initial?.length > 0) {
        setScorecards(initial);
      }
      const userId = 1; // Replace with actual user ID logic
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.SCORECARD + userId
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

  React.useEffect(() => {
    const loadScorecard = async () => {
      await handleLoadScorecards();
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
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
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
              golfCourseName={item?.golfCourseName}
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
          handleSubmitScorecard={handleSubmitScorecard}
          userId={1} // Replace with actual user ID logic
          scorecards={scorecards}
        />
      </section>
    </React.Fragment>
  );
}
