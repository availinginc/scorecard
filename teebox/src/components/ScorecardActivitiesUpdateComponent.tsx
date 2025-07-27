import * as React from "react";

import dayjs from "dayjs";

import { Select } from "@headlessui/react";
import ScorecardEditorComponent from "./ScorecardEditorComponent";

import type { Scorecard, ScorecardFormValues } from "../types/scorecard";

export default function ScorecardActivitiesUpdateComponent({
  scorecards,
  title,
  handleSubmitScorecard,
}: Readonly<{
  scorecards?: Scorecard[];
  title?: string;
  handleSubmitScorecard?: (values: ScorecardFormValues) => Promise<void>;
}>) {
  const [userScores, setUserScores] = React.useState<number[]>(
    scorecards?.[0]?.userScores ?? []
  );
  const handleSelectScorecard = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedScorecard = scorecards?.[parseInt(event?.target?.value)];
    if (selectedScorecard) {
      setUserScores(selectedScorecard?.userScores);
    }
  };
  return (
    <React.Fragment>
      <Select
        className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
        name="scorecards"
        aria-label="User scorecards"
        onChange={handleSelectScorecard}
      >
        {Array?.isArray(scorecards) && scorecards?.length > 0 ? (
          scorecards.map((item, index) => (
            <option key={`scorecard-${item?.userId}-${index}`} value={index}>
              {dayjs(item?.updated)
                .format("MM/DD/YYYY - hh:mm:ss A")
                .toString()}
            </option>
          ))
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Select>
      <ScorecardEditorComponent
        userScores={userScores}
        text={title}
        handleSubmitScorecard={handleSubmitScorecard}
      />
    </React.Fragment>
  );
}
