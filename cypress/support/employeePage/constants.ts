import { NewEmployee } from "@support/employeePage/createDataTypes";

export const createNewEmployeeBody = (employee: NewEmployee) => {
    return { ...employee, middleName: employee.middleName || "", empPicture: employee.empPicture || null };
};
