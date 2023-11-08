import { NewVacancy } from "@support/vacancyPage/createDataTypes";

export const createNewVacancyBody = (vacancy: NewVacancy) => {
  return {
    ...vacancy,
    numOfPositions: vacancy.numOfPositions || null,
    status: vacancy.status,
    isPublished: vacancy.isPublished ,
  };
};
