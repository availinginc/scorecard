import * as React from "react";

import LeaderboardComponent from "../../components/LeaderboardComponent";
import LeaderboardItemComponent from "../../components/leaderboard/LeaderboardItemComponent";

import { getRequest } from "../../functions/request";

type LeaderboardItem = {
  rank: number;
  username: string;
  course: string;
  total: number;
  scores: number[];
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardItem[]>([]);

  // Handle server-side link
  const handleLeaderboard = async () => {
    console.log("Loading leaderboard data...");
    const base = import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "";
    const leaderboard = await getRequest(base, `/scoreboard/`);
    if (leaderboard) {
      console.log("Leaderboard data loaded successfully.");
      setLeaderboard(leaderboard);
    } else {
      setLeaderboard([
        {
          rank: 1,
          username: "golfer1",
          course: "Pebble Beach",
          total: 70,
          scores: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        },
        {
          rank: 2,
          username: "golfer2",
          course: "Augusta National",
          total: 68,
          scores: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        },
      ]);
    }
  };

  React.useEffect(() => {
    const loadHandlers = async () => {
      await handleLeaderboard();
    };
    loadHandlers();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <section>
        {/* Todo: Make this a component */}
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          Leaderboard
        </h1>
        {/* Todo: Make this a component */}
        <p className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-extralight subpixel-antialiased">
          You will see your golf game here soon, including your scores, stats,
          and course information.
        </p>
        <LeaderboardComponent />
        {leaderboard.map((item, index) => (
          <LeaderboardItemComponent
            key={index}
            rank={item.rank}
            username={item.username}
            course={item.course}
            total={item.total}
            scores={item.scores}
          />
        ))}
      </section>
    </React.Fragment>
  );
}
