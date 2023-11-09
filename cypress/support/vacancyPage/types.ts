export interface VacancyResponseData {
  name: string;
  jobTitleId: number;
  employeeId: number;
  numOfPositions?: string;
  description?: string;
  status: boolean;
  isPublished: boolean;
}

export type status = true | false;

export type isPublished = true | false;
