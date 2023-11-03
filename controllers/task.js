const Task= require("../models/task")

const fetchTasks=(req,res)=>{
    Task.find()
     .then((tasks) => {
       res.status(200).json({        model: tasks,
       message: "success",
      });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme d'extraction",
        });
      });
}

const addTask=(req,res)=>{
    const task = new Task(req.body);
    task
      .save()
      .then(() => {
        res.status(201).json({
          model: task,
          message: "objet créé !",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Donnée invalides",
        });
      });
}

const updateTask=(req,res)=>{
    Task.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
        .then((task) => {
          if (!task) {
            res.status(404).json({
              message: "Objet non trouvé",
            });
          } else {
            res.status(200).json({
              model: task,
              message: "Objet modifié",
            });
          }
        })
        .catch((error) => res.status(400).json({ error: error.message }));
}

const deleteTask=(req,res)=>{
    Task.deleteOne({_id:req.params.id})
    .then(() => res.status(200).json({message :"objet supprimé!"}))
    .catch((error) => res.status(400).json({error :error.message}))

}



module.exports={
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
}