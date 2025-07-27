import * as React from "react";

import ScorecardEditorComponent from "./ScorecardEditorComponent";

import type { ScorecardFormValues } from "../types/scorecard";

export default function ScorecardActivitiesAddComponent({
  text,
  handleSubmitScorecard,
}: Readonly<{
  text?: string;
  handleSubmitScorecard?: (values: ScorecardFormValues) => Promise<void>;
}>) {
  return (
    <React.Fragment>
      <ScorecardEditorComponent
        text={text}
        handleSubmitScorecard={handleSubmitScorecard}
      />
    </React.Fragment>
  );
}
