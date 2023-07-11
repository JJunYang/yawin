import colors from 'colors';
import { Command } from 'commander';
import { currentProject } from '../../utils/project';

const devCommand = new Command('dev')
  .description('start development env for project')
  .option('--no-cache', '不需要缓存')
  .action((options) => {
    const type = currentProject.getConfigItem('type');
    if (type === 'app') {
      // todo
    } else if (type === 'npm') {
      // todo
    } else {
      console.log(colors.red('[ERROR]') + '项目类型错误或者缺少type字段');
      process.exit(1);
    }
  });

export { devCommand };
