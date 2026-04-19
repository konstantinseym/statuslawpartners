import {
  createEmployeeService,
  deleteEmployeeService,
  updateEmployeesOrderService,
} from "../services/employees.service.js";

export async function createEmployee(req, res, next) {
  try {
    const newEmployeeData = JSON.parse(req.body.data);
    const filePath = "/uploads/" + req.file.filename;
    await createEmployeeService({
      name: newEmployeeData.name,
      role: newEmployeeData.role,
      imageurl: filePath,
      imagealt: newEmployeeData.alt,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    await deleteEmployeeService(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

export async function updateEmployeesOrder(req, res, next) {
  try {
    await updateEmployeesOrderService(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
