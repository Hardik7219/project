// import cron from 'node-cron'
// import { Tasks } from '../task.model'


// cron.schedule("0 0 * * *", async () => {
//   console.log("Running daily repeat task check")

//   const tasks = await Tasks.find({
//     repeatRule: { $ne: null },
//     isTaskDone: true
//   })

//     for (const task of tasks) {

//     if (task.isTaskRepe === "daily") {
//       task.taskDate = new Date(task.taskDate.getTime() + 86400000)
//     }

//     if (task.isTaskRepe === "weekly") {
//       task.taskDate = new Date(task.taskDate.getTime() + 604800000)
//     }

//     task.isTaskDone = false

//     await task.save()
//   }
// })