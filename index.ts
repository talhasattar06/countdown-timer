#! /usr/bin/env node

import inquirer from 'inquirer';
import { differenceInSeconds } from 'date-fns';
import chalk from 'chalk';

const user = await inquirer.prompt([
    {
        name: 'res',
        message: chalk.bgHex('#770737')('Enter time (in seconds): '),
        type: "number"
    }
]);

let time: number = user.res;

function startCountdown(val: number) {
    if (val > 86400) {
        console.log(chalk.hex('#FFB6C1')('The maximum allowed time is 24 hours (86400 seconds). Please enter a value less than or equal to 86400.'));
        process.exit();
    }

    if (val < 0 || isNaN(val)) {
        console.log(chalk.hex('#FFB6C1')('It looks like there was an issue with the time entered. Please try again with a valid number.'));
        process.exit();
    }

    let initialTime = new Date();
    let intervalTime = new Date(initialTime.getTime() + (val + 1) * 1000);
    let intervalTimeFormat = new Date(intervalTime);

    setInterval(() => {
        let currentTime = new Date();
        let timeDiff = differenceInSeconds(intervalTimeFormat, currentTime);
        

        if (timeDiff <= 0) {
            console.log(chalk.bgYellowBright.redBright('\n<<<<<<<< TIMER ENDED!!!! >>>>>>>>'));
            process.exit();
        }

        let hours = Math.floor(timeDiff / 3600);
        let minutes = Math.floor((timeDiff % 3600) / 60);
        let seconds = Math.floor(timeDiff % 60);

        if (timeDiff <= 10) {
            console.clear()
            console.log(chalk.bold.underline.yellowBright("TIME LEFT:"));
            
            console.log(`\t\t${chalk.redBright(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`)}`);
        } else {
            console.clear()
            console.log(chalk.bold.underline.yellowBright("TIME LEFT:"));
            console.log(`\t\t${chalk.greenBright(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`)}`);
        }
        
    }, 1000);
}

startCountdown(time);