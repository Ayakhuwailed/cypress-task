import { isPublished, status } from "./types"

export interface NewVacancy{
  name: string,
  jobTitleId: number,
  employeeId: number,
  numOfPositions?: string,
  description?: string
  status: status,
  isPublished: isPublished
}
