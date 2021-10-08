import { Router } from "express";
import { EventController } from "./controllers/EventController";
import { UserController } from "./controllers/UserController";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";

const router = Router();

const User = new UserController();
const Event = new EventController();

router.post("/users/create", User.create);

router.post("/login", User.authenticate);

router.get("/event", Event.list);
router.get("/event/user", ensureAuthenticate, Event.listByUser);
router.post("/event/create", ensureAuthenticate, Event.create);
router.put("/event/update/:id", ensureAuthenticate, Event.update);
router.delete("/event/delete/:id", ensureAuthenticate, Event.delete);


export { router };