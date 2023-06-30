import { Command } from 'commander';
import { getAbsolutePath } from '../../utils';

const testCommand = new Command('test')
  .usage('[global options] command')
  .description('test test')
  .option('-f, --file <file address>', 'init project address')
  .action((options) => {
    const workspace = options.file ? getAbsolutePath(options.file) : process.cwd();
    console.log('🚀 ~ workspace:', workspace);
  });

export { testCommand };
