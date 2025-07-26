import * as React from "react";

import { useFormik } from "formik";
import type { FormikProps } from "formik";
import * as yup from "yup";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import ParagraphComponent from "./ParagraphComponent";

type ScorecardFormValues = {
  userScores: number[];
};

const handleIncrement = (
  index: number,
  formik: FormikProps<ScorecardFormValues>
) => {
  const userScores = [...formik.values.userScores];
  userScores[index] = userScores[index] + 1;
  formik.setFieldValue("userScores", userScores);
};

const handleDecrement = (
  index: number,
  formik: FormikProps<ScorecardFormValues>
) => {
  const userScores = [...formik.values.userScores];
  userScores[index] = userScores[index] - 1;
  formik.setFieldValue("userScores", userScores);
};

const validationSchema = yup.object({
  userScores: yup.array().of(yup.number().min(0).required()),
});

export default function ScorecardActivitiesAddComponent() {
  const formik = useFormik<ScorecardFormValues>({
    initialValues: {
      userScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Adding new scorecard with values:", values);
      } catch (error) {
        console.log("Error adding new scorecard");
        return error;
      }
    },
  });
  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 md:my-9 mx-auto">
          <Fieldset className="space-y-6">
            <ParagraphComponent text={"Hole One (1)"} />
            <Field>
              <Label className="my-3 text-lg font-medium text-neutral-300 text-left subpixel-antialiased">
                Score:
              </Label>
              <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
                <Button
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                  onClick={() => handleDecrement(0, formik)}
                >
                  -
                </Button>
                <Input
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-300 text-center subpixel-antialiased"
                  value={formik?.values?.userScores[0]}
                  onChange={(e) =>
                    formik.setFieldValue("userScores[0]", e?.target?.value)
                  }
                  required
                />
                <Button
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                  onClick={() => handleIncrement(0, formik)}
                >
                  +
                </Button>
              </div>
            </Field>
            <hr className="my-9 border-t border-neutral-600" />
            <ParagraphComponent text={"Hole Two (2)"} />
            <Field>
              <Label className="my-3 text-lg font-medium text-neutral-300 text-left subpixel-antialiased">
                Score:
              </Label>
              <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
                <Button
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                  onClick={() => handleDecrement(1, formik)}
                >
                  -
                </Button>
                <Input
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-300 text-center subpixel-antialiased"
                  value={formik?.values?.userScores[1]}
                  onChange={(e) =>
                    formik.setFieldValue("userScores[1]", e?.target?.value)
                  }
                  required
                />
                <Button
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                  onClick={() => handleIncrement(1, formik)}
                >
                  +
                </Button>
              </div>
            </Field>
            <hr className="my-9 border-t border-neutral-600" />
            <ParagraphComponent text={"Hole Three (3)"} />
            <Field>
              <Label className="my-3 text-lg font-medium text-neutral-300 text-left subpixel-antialiased">
                Score:
              </Label>
              <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
                <Button
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                  onClick={() => handleDecrement(2, formik)}
                >
                  -
                </Button>
                <Input
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-300 text-center subpixel-antialiased"
                  value={formik?.values?.userScores[2]}
                  onChange={(e) =>
                    formik.setFieldValue("userScores[2]", e?.target?.value)
                  }
                  required
                />
                <Button
                  className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                  onClick={() => handleIncrement(2, formik)}
                >
                  +
                </Button>
              </div>
            </Field>
            <hr className="my-9 border-t border-neutral-600" />
            <Button
              className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-950 hover:text-neutral-950 bg-lime-600 hover:bg-neutral-300 transition-all cursor-pointer"
              type="submit"
            >
              Add scorecard
            </Button>
          </Fieldset>
        </div>
      </form>
    </React.Fragment>
  );
}
