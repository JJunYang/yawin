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
    }
  } catch (error) {
    //
  }
});

export { deployCommand };
