const cron = require("node-cron");

cron.schedule("35 18 11 * *", () =>{
    console.log("run task everytime")
});