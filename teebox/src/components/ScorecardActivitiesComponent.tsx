import * as React from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import HeadingThreeComponent from "./HeadingThreeComponent";
import ParagraphComponent from "./ParagraphComponent";
import ScorecardActivitiesAddComponent from "./ScorecardActivitiesAddComponent";

export default function ScorecardActivitiesComponent() {
  return (
    <React.Fragment>
      <TabGroup>
        <TabList className="flex flex-col md:flex-row md:justify-between md:items-center">
          <Tab className="active flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
            Add scorecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
            Update scorecard
          </Tab>
          <Tab className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 aria-selected:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased">
            Delete scorecard
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="my-3">
              <HeadingThreeComponent text="Add a scorecard" />
              <ParagraphComponent text="Fill out the form below to add a scorecard." />
            </div>
            <ScorecardActivitiesAddComponent />
          </TabPanel>
          <TabPanel>
            <div className="my-3">
              <HeadingThreeComponent text="Update a scorecard" />
              <ParagraphComponent text="Fill out the form below to update a scorecard." />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="my-3">
              <HeadingThreeComponent text="Delete a scorecard" />
              <ParagraphComponent text="Fill out the form below to delete a scorecard." />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </React.Fragment>
  );
}
