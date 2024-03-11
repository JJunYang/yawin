import colors from 'colors';
import { Command } from 'commander';
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
      console.log(colors.red('[ERROR]') + `当前运行目录不为根目录，或当前项目不为npm项目`);
    }
  } catch (error) {
    //
  }
});

export { deployCommand };
