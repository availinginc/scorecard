import * as React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import ParagraphComponent from "./ParagraphComponent";

const validationSchema = yup.object({
  userScores: yup.array().of(yup.number().min(0).required()),
  golfCoursePars: yup.array().of(yup.number().min(0).required()),
});
export default function ScorecardActivitiesAddComponent() {
  const formik = useFormik({
    initialValues: {
      userScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      golfCoursePars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Score:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.userScores[0]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[0]", e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Handicap:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.golfCoursePars[0]}
                onChange={(e) =>
                  formik.setFieldValue("golfCoursePars[0]", e.target.value)
                }
                required
              />
            </Field>
            <hr className="my-4 border-t border-neutral-600" />
            <ParagraphComponent text={"Hole Two (2)"} />
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Score:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.userScores[1]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[1]", e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Handicap:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.golfCoursePars[1]}
                onChange={(e) =>
                  formik.setFieldValue("golfCoursePars[1]", e.target.value)
                }
                required
              />
            </Field>
            <hr className="my-4 border-t border-neutral-600" />
            <ParagraphComponent text={"Hole Three (3)"} />
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Score:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.userScores[2]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[2]", e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Handicap:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.golfCoursePars[2]}
                onChange={(e) =>
                  formik.setFieldValue("golfCoursePars[2]", e.target.value)
                }
                required
              />
            </Field>
            <hr className="my-4 border-t border-neutral-600" />
            <ParagraphComponent text={"Hole Four (4)"} />
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Score:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.userScores[3]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[3]", e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                Handicap:
              </Label>
              <Input
                className={clsx(
                  "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.golfCoursePars[3]}
                onChange={(e) =>
                  formik.setFieldValue("golfCoursePars[3]", e.target.value)
                }
                required
              />
            </Field>
            <hr className="my-4 border-t border-neutral-600" />
            <ParagraphComponent text={"Hole Five (5)"} />
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-400">
                Score:
              </Label>
              <Input
                className={clsx(
                  "mt-4 block w-full border-none bg-white/5 px-4 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.userScores[4]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[4]", e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-400">
                Handicap:
              </Label>
              <Input
                className={clsx(
                  "mt-4 block w-full border-none bg-white/5 px-4 py-1.5 text-base text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                value={formik.values.golfCoursePars[4]}
                onChange={(e) =>
                  formik.setFieldValue("golfCoursePars[4]", e.target.value)
                }
                required
              />
            </Field>
            <Button
              className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 transition-all cursor-pointer"
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
