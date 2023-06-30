import { Command } from 'commander';
import { currentProject } from '../../utils/project';

const devCommand = new Command('dev')
  .description('start development env for project')
  .option('--no-cache', '不需要缓存')
  .action((options) => {
    console.log('🚀 ~ options:', options);
    console.log('🚀 ~ currentProject:', currentProject);
  });

export { devCommand };
