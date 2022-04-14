const cron= require("node-cron");

console.log('SIP is going to deduct');
const task = cron.schedule('14 11 5-12 January-December *', ()=> {
   
	const d = new Date();
	console.log('Every Month:', d);
});
console.log("SIP deducted");
task.start();