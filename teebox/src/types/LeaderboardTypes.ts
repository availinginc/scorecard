export type Leaderboard = {
  submitted?: string;
  updated?: string;
  userId?: number;
  userName?: string;
  userRank?: number;
  userHandicap?: number;
  userScores?: number[];
  userTotalScore?: number;
  golfCourse?: string;
  golfCoursePars?: number[];
  golfCourseTotalPar?: number;
  golfCourseHolesPlayed?: number;
};
