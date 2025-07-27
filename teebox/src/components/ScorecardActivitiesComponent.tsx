import * as React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import HeadingThreeComponent from "./HeadingThreeComponent";
import ParagraphComponent from "./ParagraphComponent";
import ScorecardActivitiesAddComponent from "./ScorecardEditorComponent";
import ScorecardActivitiesUpdateComponent from "./ScorecardActivitiesUpdateComponent";
import ScorecardActivitiesDeleteComponent from "./ScorecardActivitiesDeleteComponent";
import type { Scorecard } from "../types/ScorecardTypes";

export default function ScorecardActivitiesComponent({
  scorecards,
  handleSubmitScorecard,
}: Readonly<{
  scorecards?: Scorecard[];
  handleSubmitScorecard?: (values: Scorecard) => Promise<void>;
}>) {
  return (
    <React.Fragment>
      <TabGroup>
        <TabList className="flex flex-col md:flex-row md:justify-between md:items-center">
          <Tab className="active flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Add scorecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Update scorecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer">
            Delete scorecard
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <HeadingThreeComponent text="Add a scorecard" />
            <ParagraphComponent text="Fill out the form below to add a scorecard." />
            <ScorecardActivitiesAddComponent
              activity={"add"}
              text={"Add scorecard"}
              handleSubmitScorecard={handleSubmitScorecard}
            />
          </TabPanel>
          <TabPanel className="">
            <HeadingThreeComponent text="Update a scorecard" />
            <ParagraphComponent text="Select the scorecard you want to update and fill out the form below." />
            <ScorecardActivitiesUpdateComponent
              activity={"update"}
              scorecards={scorecards}
              title={"Update scorecard"}
              handleSubmitScorecard={handleSubmitScorecard}
            />
          </TabPanel>
          <TabPanel className="">
            <HeadingThreeComponent text="Delete a scorecard" />
            <ParagraphComponent text="Select the scorecard you want to delete and review the form below." />
            <ScorecardActivitiesDeleteComponent
              activity={"delete"}
              scorecards={scorecards}
              title={"Delete scorecard"}
              handleSubmitScorecard={handleSubmitScorecard}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </React.Fragment>
  );
}
