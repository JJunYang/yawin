import { Command } from 'commander';
import { NpmDeploy } from './npmDeploy';

const deployCommand = new Command('deploy').description('yawin deploy command');

deployCommand.action((options) => {
  try {
    // const type = currentProject.getConfigItem('type');
    // if (type === 'npm') {
    //   //
    // } else if (type === 'app') {
    //   //
    // } else {
    //   logAndExit('当前运行目录不为根目录，或当前项目不为npm项目', 1);
    // }
    const newNpmInstance = new NpmDeploy(process.cwd());
    newNpmInstance.run();
  } catch (error) {
    //
  }
});

export { deployCommand };
