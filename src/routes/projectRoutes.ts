import { Router } from "express";
import { body, param } from "express-validator";

import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import {
  hasAuthorization,
  taskBelongsToProject,
  taskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

//const router = Router();
const router: Router = Router();

router.use(authenticate);

router.post(
  "/",

  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("La Description del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Description del Proyecto es Obligatoria"),
  handleInputErrors,

  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",

  param("id").isMongoId().withMessage("ID no válido"),

  handleInputErrors,

  ProjectController.getProjectById
);

//para evitar poner validateProjectExists en cada uno de los que tengan /:projectId en sus url
// validateProjectExists se ejecutara primero automáticamente cuando se ingrese en la url
router.param("projectId", projectExists);

router.put(
  "/:projectId",
  param("projectId").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("La Description del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Description del Proyecto es Obligatoria"),

  handleInputErrors,

  hasAuthorization,

  ProjectController.updateProject
);

router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,

  hasAuthorization,

  ProjectController.deleteProject
);

// Routes for tasks

router.post(
  "/:projectId/tasks",

  hasAuthorization,

  body("name").notEmpty().withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Description de la Tarea es Obligatorio"),
  handleInputErrors,

  TaskController.createTask
);

router.get(
  "/:projectId/tasks",

  TaskController.getProjectTasks
);

//para evitar poner validateProjectExists en cada uno de los que tengan /:projectId en sus url
// validateProjectExists se ejecutara primero automáticamente cuando se ingrese en la url
router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",

  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,

  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",

  hasAuthorization,

  param("taskId").isMongoId().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Description de la Tarea es Obligatorio"),
  handleInputErrors,

  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",

  hasAuthorization,

  param("taskId").isMongoId().withMessage("ID no válido"),

  handleInputErrors,

  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",

  param("taskId").isMongoId().withMessage("ID no válido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),

  handleInputErrors,

  TaskController.updateStatus
);

// Rutes for Teams
router.post(
  "/:projectId/team/find",

  body("email").isEmail().toLowerCase().withMessage("E-mail no válido"),

  handleInputErrors,

  TeamMemberController.findMemberByEmail
);

router.get(
  "/:projectId/team",

  // body("id").isMongoId().withMessage("Id no válido"),

  handleInputErrors,

  TeamMemberController.getProjectTeam
);
router.post(
  "/:projectId/team",

  body("id").isMongoId().withMessage("Id no válido"),

  handleInputErrors,

  TeamMemberController.addMemberById
);

router.delete(
  "/:projectId/team/:userId",

  param("userId").isMongoId().withMessage("Id no válido"),

  handleInputErrors,

  TeamMemberController.removeMemberById
);

// Routes for Notes
router.post(
  "/:projectId/tasks/:taskId/notes",

  body("content")
    .notEmpty()
    .withMessage("El contenido de la nota es obligatorio"),

  handleInputErrors,

  NoteController.createNote
);

router.get(
  "/:projectId/tasks/:taskId/notes",

  NoteController.getTaskNotes
);

router.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",

  param("noteId").isMongoId().withMessage("ID No Válido"),

  handleInputErrors,

  NoteController.deleteNotes
);

export default router;
