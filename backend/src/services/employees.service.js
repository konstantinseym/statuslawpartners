import {
  deleteEmployee,
  getEmployee,
  newEmployee,
  updateEmployeesOrder,
} from "../repositories/employees.repository.js";
import { deleteFile } from "./file.service.js";

const JSON_LIMIT = 20000;

function validateJSONLength(data) {
  if (!data || typeof data !== "object") {
    throw new Error("invalid data");
  }

  const stringifiedData = JSON.stringify(data);

  if (stringifiedData.length > JSON_LIMIT) {
    throw new Error("one or more values is too long");
  }
}

export async function createEmployeeService(data) {
  validateJSONLength(data);
  await newEmployee(data);
}

export async function deleteEmployeeService(id) {
  const parsedId = Number(id);

  if (parsedId <= 0 || !Number.isInteger(parsedId)) {
    throw new Error("invalid data");
  }

  const employee = await getEmployee(parsedId);
  await deleteEmployee(parsedId);
  await deleteFile(employee.imageurl);
}

export async function updateEmployeesOrderService(data) {
  await updateEmployeesOrder(data);
}
