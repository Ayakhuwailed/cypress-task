import { NewJob } from "@support/jobPage/createDataTypes";

export const createNewJobBody = (job: NewJob) => {
  return {
    ...job,
    description: job.description || "",
    note: job.note || "",
    specification: job.specification || null,
  };
};
