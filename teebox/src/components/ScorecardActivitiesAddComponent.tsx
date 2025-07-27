import * as React from "react";
import ScorecardEditorComponent from "./ScorecardEditorComponent";
import type { Scorecard } from "../types/ScorecardTypes";

export default function ScorecardActivitiesAddComponent({
  activity,
  text,
  handleSubmitScorecard,
}: Readonly<{
  activity?: string;
  text?: string;
  handleSubmitScorecard?: (values: Scorecard) => Promise<void>;
}>) {
  return (
    <React.Fragment>
      <ScorecardEditorComponent
        activity={activity}
        text={text}
        handleSubmitScorecard={handleSubmitScorecard}
      />
    </React.Fragment>
  );
}
