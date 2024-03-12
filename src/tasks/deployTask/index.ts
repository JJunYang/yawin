import { Command } from 'commander';
import { logAndExit } from '../../utils/log';
import { currentProject } from '../../utils/project';
import { NpmDeploy } from './npmDeploy';

const deployCommand = new Command('deploy').description('yawin deploy command');

deployCommand.action((options) => {
  try {
    const type = currentProject.getConfigItem('type');
    if (type === 'npm') {
      const newNpmInstance = new NpmDeploy(process.cwd());
      newNpmInstance.run();
    } else if (type === 'app') {
      //
    } else {
      logAndExit('当前运行目录不为根目录，或当前项目不为npm项目', 1);
    }
  } catch (error) {
    //
  }
});

export { deployCommand };
