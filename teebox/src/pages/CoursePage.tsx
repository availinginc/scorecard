import * as React from "react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import HeadingTwoComponent from "../components/HeadingTwoComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import ParagraphComponent from "../components/ParagraphComponent";
import CourseDesktopComponent from "../components/CourseDesktopComponent";
import CourseMobileComponent from "../components/CourseMobileComponent";

import type { GolfCourse } from "../types/GolfCourseTypes";
import { endpoints } from "../configurations/constants";
import { getRequest } from "../functions/request";

export default function CoursePage() {
  const [golfCourses, setGolfCourses] = React.useState<GolfCourse[]>([]);

  // Get Golf Courses from API
  const getGolfCourses = async () => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.GOLFCOURSE
      );
      if (response) return response;
      else return null;
    } catch (error) {
      console.error("Error getting golf courses");
      return error;
    }
  };

  // Handle loading ten blank golf courses or results +/- golf courses
  const handleLoadingGolfCourses = async () => {
    try {
      while (golfCourses.length < 10) {
        golfCourses.push({
          golfCourseId: 0,
          golfCourseName: "TBD",
          golfCoursePars: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          golfCourseTotalPar: 0,
        });
      }
      const response = await getGolfCourses();
      if (response?.length > 0) {
        response.forEach((item: GolfCourse, index: number) => {
          golfCourses.splice(index, 1, item);
        });
      }
      if (golfCourses?.length > 0) setGolfCourses([...golfCourses]);
    } catch (error) {
      console.error("Error loading golf courses");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingGolfCourses();
    };
    load();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        <HeadingOneComponent text={"Course"} />
        <IntroductionComponent
          text={"Add your golf course and track your rounds."}
        />
      </section>
      <section className="invisible lg:visible hidden lg:block my-3">
        <div className="border-1 border-neutral-950">
          <ul className="z-0 flex flex-row flex-auto justify-center content-evenly items-stretch">
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Course
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-left border-l-1 border-neutral-950 subpixel-antialiased">
              Par
            </li>
            <li className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
              +
            </li>
          </ul>
        </div>
        {Array?.isArray(golfCourses) && golfCourses?.length > 0 ? (
          golfCourses?.map((item, index) => (
            <CourseDesktopComponent
              key={`golfcourse-${item?.golfCourseId}-${index}`}
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
              golfCourseTotalPar={item?.golfCourseTotalPar}
            />
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
      <section className="block lg:hidden visible lg:invisible my-3 border-1 border-neutral-950">
        {Array?.isArray(golfCourses) && golfCourses?.length > 0 ? (
          golfCourses?.map((item, index) => (
            <CourseMobileComponent
              key={`golfcourse-${item?.golfCourseId}-${index}`}
              golfCourseName={item?.golfCourseName}
              golfCoursePars={item?.golfCoursePars}
              golfCourseTotalPar={item?.golfCourseTotalPar}
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
        {/* <ScorecardActivitiesComponent
          handleSubmitScorecard={handleSubmitScorecard}
          userId={1} // Replace with actual user ID logic
          selectableScorecards={selectableScorecards}
          selectableGolfCourses={selectableGolfCourses}
        /> */}
      </section>
    </React.Fragment>
  );
}
