const express=require("express")
const router=express.Router()
const Task=require("../models/task")
const taskController=require("../controllers/task")
const auth=require("../middlewares/auth")


router.get("/",auth.loggedMiddleware,auth.isAdmin, taskController.fetchTasks)
router.get("/:id",auth.loggedMiddleware, (req, res) => {
    Task.findOneAndUpdate({
      _id: req.params.id,
    })
      .then((task) => {
        if (!task) {
          res.status(404).json({
            message: "Objet non trouvé",
          });
        } else {
          res.status(200).json({
            model: task,
            message: "Objet trouvé",
          });
        }
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  });
router.post("/",auth.loggedMiddleware, taskController.addTask)
router.patch("/:id",auth.loggedMiddleware, taskController.updateTask)
router.delete("/:id",auth.loggedMiddleware, taskController.deleteTask)

  module.exports=router