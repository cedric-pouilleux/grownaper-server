import { Plant } from '../models.js';
import Moment from 'moment';

const CronJob = require('cron').CronJob;

/**
 * Run every day task for populate history with starting flowering cycle
 */
const job = new CronJob('0 0 * * *', async () => {
    console.log('Task refresh plants when start flowering is started');
    const plants = await Plant.find({});
    const today = Moment();
    for (const plant of plants) {
        if(plant.floweringStarted){
            return false;
        }
        const floDate = plant.startFloweringDate;
        const isStarted = today.isAfter(Moment(floDate));
        if(floDate && isStarted){
            await Plant.findByIdAndUpdate(plant._id, {
                floweringStarted: true,
                $addToSet: {
                    history: {
                        date: today,
                        action: 'START_FLO',
                        message: 'Starting flowering cycle',
                    }
                }
            });
        }
    }
});

job.start();