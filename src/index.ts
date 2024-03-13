import { Command } from 'commander';
import dotEnv from 'dotenv';
import { deployCommand } from './tasks/deployTask';
import { devCommand } from './tasks/devTask';
import { initCommand } from './tasks/initTask';
import { testCommand } from './tasks/testTask';
dotEnv.config();

const program = new Command();

program.name('yawin').description('This is my Commander yawin').version('0.0.1');

program.addCommand(initCommand);
program.addCommand(testCommand);
program.addCommand(devCommand);
program.addCommand(deployCommand);

program.parse();
