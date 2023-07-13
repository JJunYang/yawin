import colors from 'colors';
import { Command } from 'commander';
import compressing from 'compressing';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import { downLoadZip, getAbsolutePath, removeFiles } from '../../utils';
import { DEFAULT_BRANCH, REPOSITORY_NAME, initTypeOptions, npmOptions } from './const';

const initCommand = new Command('init')
  .description('yawin first init command')
  .option('-f, --file <file address>', 'init project address');

initCommand.action(async (options) => {
  try {
    // 初始化项目地址
    const workspace = options.file ? getAbsolutePath(options.file) : process.cwd();

    const targetDir = fse.readdirSync(workspace);
    if (targetDir && targetDir.length > 0) {
      console.log(colors.red('[ERROR]') + '目标目录不为空: ' + colors.bgBlue(`${workspace}`));
      process.exit(-1);
    }
    console.log(colors.green('[INFO] 检测当前目录为空'));
    const { initType } = await inquirer.prompt(initTypeOptions);

    const branchName = DEFAULT_BRANCH;

    console.log(`开始初始化${initType}项目`);
    const answer = await inquirer.prompt(npmOptions);

    const zipPath: string = await downLoadZip(workspace, branchName);
    // 待解压文件地址
    const fileToDecompress = getAbsolutePath(zipPath);
    // 解压目标地址
    const pathToDecompress = path.dirname(fileToDecompress);
    await compressing.tgz.uncompress(fileToDecompress, pathToDecompress);

    // 解压后的文件地址
    const decompressedTopDir = path.join(pathToDecompress, REPOSITORY_NAME + '-' + branchName);
    const needRemoveList = [
      { path: fileToDecompress, isDir: false },
      { path: decompressedTopDir, isDir: true },
    ];
    // 获取到解压文件内的对应项目地址
    const projectDir = path.join(decompressedTopDir, initType);
    if (!fse.existsSync(projectDir)) {
      removeFiles(needRemoveList);
      console.log(colors.red('[ERROR]') + `${initType}项目不存在，初始化失败`);
      process.exit(1);
    }
    const subFiles = fse.readdirSync(projectDir);
    for (const subFile of subFiles) {
      const sourcePath = path.join(projectDir, subFile);
      const targetPath = path.join(workspace, subFile);
      fse.moveSync(sourcePath, targetPath);
    }

    removeFiles(needRemoveList);

    // 额外配置更新至package.json
    const pkgDir = path.join(workspace, 'package.json');
    const pkgData = fse.readFileSync(pkgDir, 'utf-8');
    const jsonData = JSON.parse(pkgData);
    for (const key in answer) {
      jsonData[key] = answer[key];
    }
    fse.writeFileSync(pkgDir, JSON.stringify(jsonData, null, '\t'), 'utf-8');

    console.log(colors.green('[SUCCESS]') + `初始化${initType}项目成功`);
    process.exit(0);
  } catch (error) {
    console.log(colors.red('[ERROR]') + error);
    process.exit(-1);
  }
});

export { initCommand };
