import { Command } from 'commander';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import { getAbsolutePath } from '../../utils';

const testCommand = new Command('test')
  .usage('[global options] command')
  .description('test test')
  .option('-f, --file <file address>', 'init project address')
  .action(async (options) => {
    try {
      const workspace = options.file ? getAbsolutePath(options.file) : process.cwd();
      console.log('🚀 ~ workspace:', workspace);
      const answer = await inquirer.prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Input Package Name',
          default: 'react-npm-template',
        },
        { name: 'version', type: 'input', message: 'Input Package Init Version', default: '1.0.0' },
        { name: 'author', type: 'input', message: 'Input Author Name', default: '' },
      ]);
      const pkgDir = path.join(workspace, 'package.json');
      const pkgData = fse.readFileSync(pkgDir, 'utf-8');
      const jsonData = JSON.parse(pkgData);
      for (const key in answer) {
        jsonData[key] = answer[key];
      }
      fse.writeFileSync(pkgDir, JSON.stringify(jsonData, null, '\t'), 'utf-8');
      console.log(answer);
    } catch (error) {
      //
    }
  });

export { testCommand };
