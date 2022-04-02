import { Plant } from '../models.js';

const CronJob = require('cron').CronJob;
const job = new CronJob('* * * * * *', async function() {
    const plants = await Plant.find({});
    console.log(plants);
    //execute every day task for add history start flowering date
});
job.start();