import express from "express";

import { create, getuser,getuserbyid,updateusers,deleteusers } from "../controller/controller.js";

const route = express.Router();

route.post("/user",create);

route.get("/users",getuser);

route.get("/user/:id",getuserbyid);

route.put("/newuser/:id",updateusers);

route.delete("/deleteduser/:id",deleteusers);

export default route;